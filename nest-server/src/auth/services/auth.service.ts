import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegiserDTO } from '../types/register-user.dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/common/services/otp.service';
import { SERVER_URL } from 'src/config';
import { EmailService } from 'src/common/services/mail.service';
import { emailFormat } from 'src/common/utils/email.format';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerUser: UserRegiserDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerUser.password, salt);
    registerUser.password = hashedPassword;
    const { verifyCode, verifyCodeExpiredTime } = this.otpService.generateOTP();
    const userExists = await this.userModel.findOne({
      email: registerUser.email,
    });
    let user = null;
    if (userExists) {
      if (userExists.verified) {
        throw new HttpException(
          'Email is already used',
          HttpStatus.BAD_REQUEST,
        );
      }
      user = await this.userModel.findOneAndUpdate(
        { email: registerUser.email },
        {
          $set: {
            password: hashedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiredTime: verifyCodeExpiredTime,
          },
        },
        { new: true },
      );
    } else {
      registerUser.about = `Hello, My name is ${registerUser.displayName}`;
      registerUser.verified = false;
      registerUser.verifyCode = verifyCode;
      registerUser.verifyCodeExpiredTime = verifyCodeExpiredTime;
      registerUser.avatar = `${SERVER_URL}/default/default_avatar.jpeg`;
      user = new this.userModel(registerUser);
      await user.save();
    }
    // send mail
    const { error } = await this.emailService.sendMail({
      email: registerUser.email,
      subject: 'Verify your account',
      html: emailFormat(
        'Verify your account!',
        'this is content',
        `${SERVER_URL}/api/auth/verify-account/${user.id}/${verifyCode}`,
      ),
    });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    // response
    return { message: 'Send OTP successfully', statusCode: 200 };
  }
}
