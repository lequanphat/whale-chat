import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class OtpService {
  generateOTP(): { verifyCode: string; verifyCodeExpiredTime: number } {
    const verifyCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const verifyCodeExpiredTime = Date.now() + 5 * 60 * 1000; // 5 mins
    return { verifyCode, verifyCodeExpiredTime };
  }
}
