import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSevice: AuthService) {}
  @Post('register')
  async register() {
    return this.authSevice.register();
  }
}
