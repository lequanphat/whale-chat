import { Module } from '@nestjs/common';
import { CookieService } from './services/cookie.service';
import { JwtService } from './services/jwt.service';
import { OtpService } from './services/otp.service';
import { EmailService } from './services/mail.service';

@Module({
  providers: [CookieService, JwtService, OtpService, EmailService],
  exports: [CookieService, JwtService, OtpService, EmailService],
})
export class CommonModule {}
