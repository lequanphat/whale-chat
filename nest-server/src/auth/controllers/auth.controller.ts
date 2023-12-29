import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRegiserDTO } from '../types/register-user.dto';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSevice: AuthService) {}
  @Post('register')
  register(@Body() data: UserRegiserDTO) {
    const userRegister = plainToClass(UserRegiserDTO, data, {
      excludeExtraneousValues: true,
    });
    return this.authSevice.register(userRegister);
  }
}
