import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRegiserDTO } from '../types/register-user.dto';
import { plainToClass } from 'class-transformer';
import { ChangePasswordDTO, EmailDTO, VerifyParamDTO } from '../types';
import { CookieService } from 'src/common/services/cookie.service';
import { Response } from 'express';
import { JwtService } from 'src/common/services/jwt.service';
import { UserLoginDTO } from '../types/login-user.dto';
import { CLIENT_URL } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSevice: AuthService,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body() data: UserRegiserDTO, @Res() res: Response) {
    const userRegister = plainToClass(UserRegiserDTO, data, {
      excludeExtraneousValues: true,
    });
    try {
      await this.authSevice.register(userRegister);
      return res.status(HttpStatus.OK).json({ message: 'Successfully' });
    } catch (error) {
      throw error;
    }
  }
  @Get('verify-account/:id/:code')
  async verifyAccount(@Param() param: VerifyParamDTO, @Res() res: Response) {
    try {
      const { user } = await this.authSevice.verifyAccount(param);
      console.log('controller user', user);
      const refreshToken = this.jwtService.signRefreshToken({ id: user._id, role: user.role });
      this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
      // redirect
      res.redirect(`${CLIENT_URL}/auth/verify-account`);
    } catch (error) {
      throw error;
    }
  }
  @Post('login')
  async login(@Body() data: UserLoginDTO, @Res() res: Response) {
    const loginData = plainToClass(UserLoginDTO, data, { excludeExtraneousValues: true });
    try {
      const { user } = await this.authSevice.login(loginData);

      // generate token
      const accessToken = this.jwtService.signAccessToken({ id: user._id, role: user.role });
      const refreshToken = this.jwtService.signRefreshToken({ id: user._id, role: user.role });
      this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
      // serialize data
      return res.status(200).json({ user, token: accessToken });
    } catch (error) {
      throw error;
    }
  }
  @Get('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    try {
      const id: string = req.user.id;
      await this.authSevice.logout(id);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(200).json({ msg: 'logout successfully' });
    } catch (error) {
      throw error;
    }
  }
  @Get('refresh-token')
  async refreshToken(@Req() req: any, @Res() res: Response) {
    console.log('refresh token');
    const id = req.user.id;
    const role = req.user.role;
    const accessToken = this.jwtService.signAccessToken({ id, role });
    const refreshToken = this.jwtService.signRefreshToken({ id, role });
    this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
    return res.status(200).json({ token: accessToken });
  }
  @Post('forgot-password')
  async forgotPassword(@Body() data: EmailDTO, @Res() res: Response) {
    try {
      const value = await this.authSevice.forgotPassword(data.email);
      return res.status(200).json({ message: value.message });
    } catch (error) {
      throw error;
    }
  }
  @Get('/change-password/:id/:code')
  async verifyChangePassword(@Param() data: VerifyParamDTO, @Res() res: Response) {
    try {
      await this.authSevice.verifyChangePassword(data);
      console.log('data controller here...');
      // sign token
      const resetPasswordToken = this.jwtService.signResetPasswordToken({ id: data.id });
      // redirect
      return res.redirect(`${CLIENT_URL}/auth/reset-password/${resetPasswordToken}`);
    } catch (error) {
      return error;
    }
  }

  @Post('change-password')
  async changePassword(@Body() data: ChangePasswordDTO) {
    try {
      // verify token
      const value = this.jwtService.verifyResetPasswordToken(data.token);
      // change password service
      return this.authSevice.changePassword(data, value.id);
    } catch (error) {
      throw error;
    }
  }
}
