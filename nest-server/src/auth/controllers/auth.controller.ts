import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRegiserDTO } from '../types/register-user.dto';
import { plainToClass } from 'class-transformer';
import { ChangePasswordDTO, EmailDTO, SerializeUser, VerifyParamDTO } from '../types';
import { CookieService } from 'src/common/services/cookie.service';
import { Response } from 'express';
import { JwtService } from 'src/common/services/jwt.service';
import { UserLoginDTO } from '../types/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSevice: AuthService,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')
  register(@Body() data: UserRegiserDTO) {
    const userRegister = plainToClass(UserRegiserDTO, data, {
      excludeExtraneousValues: true,
    });
    return this.authSevice.register(userRegister);
  }
  @Get('verify-account/:id/:code')
  async verifyAccount(@Param() param: VerifyParamDTO, @Res() res: Response) {
    const { user } = await this.authSevice.verifyAccount(param);
    console.log('controller user', user);

    const accessToken = this.jwtService.signAccessToken({ id: user._id });
    const refreshToken = this.jwtService.signRefreshToken({ id: user._id });
    this.cookieService.saveCookie(res, 'accessToken', accessToken);
    this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
    console.log('redirect');
    res.redirect(`http://localhost:9999/auth/verify-account`);
  }
  @Post('login')
  async login(@Body() data: UserLoginDTO, @Res() res: Response) {
    const loginData = plainToClass(UserLoginDTO, data, { excludeExtraneousValues: true });
    const { user } = await this.authSevice.login(loginData);
    // generate token
    const accessToken = this.jwtService.signAccessToken({ id: user._id });
    const refreshToken = this.jwtService.signRefreshToken({ id: user._id });
    this.cookieService.saveCookie(res, 'accessToken', accessToken);
    this.cookieService.saveCookie(res, 'refreshToken', refreshToken);

    // serialize data
    const serializeUser = plainToClass(SerializeUser, user, { excludeExtraneousValues: true });
    return res.status(200).json({ user: serializeUser });
  }
  @Get('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    const id: string = req.user.id;
    await this.authSevice.logout(id);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ msg: 'logout successfully' });
  }
  @Get('refresh-token')
  async refreshToken(@Req() req: any, @Res() res: Response) {
    const id = req.user.id;
    const accessToken = this.jwtService.signAccessToken({ id });
    const refreshToken = this.jwtService.signRefreshToken({ id });
    this.cookieService.saveCookie(res, 'accessToken', accessToken);
    this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
    return res.status(200).json({ msg: 'refresh-token successfully' });
  }
  @Post('forgot-password')
  async forgotPassword(@Body() data: EmailDTO) {
    return this.authSevice.forgotPassword(data.email);
  }
  @Get('/change-password/:id/:code')
  async verifyChangePassword(@Param() data: VerifyParamDTO, @Res() res: Response) {
    try {
      await this.authSevice.verifyChangePassword(data);
      console.log('data controller here...');
      // // sign token
      const resetPasswordToken = this.jwtService.signAccessToken({ id: data.id });
      // // redirect
      console.log(resetPasswordToken);

      return res.redirect(`http://localhost:9999/auth/reset-password/${resetPasswordToken}`);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('change-password')
  async changePassword(@Body() data: ChangePasswordDTO) {
    try {
      // verify token
      const value = this.jwtService.verifyAccessToken(data.token);
      return this.authSevice.changePassword(data, value.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
