import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRegiserDTO } from '../types/register-user.dto';
import { plainToClass } from 'class-transformer';
import { VerifyParam } from '../types';
import { CookieService } from 'src/common/services/cookie.service';
import { Response } from 'express';
import { JwtService } from 'src/common/services/jwt.service';

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
  async verifyAccount(@Param() param: VerifyParam, @Res() res: Response) {
    const { user } = await this.authSevice.verifyAccount(param);
    const accessToken = this.jwtService.signAccessToken({ id: user._id });
    const refreshToken = this.jwtService.signRefreshToken({ id: user._id });
    this.cookieService.saveCookie(res, 'accessToken', accessToken);
    this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
    return res.redirect(`http://localhost:9999/auth/verify-account`);
  }
}
