import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegiserDTO } from '../types/register-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/common/services/otp.service';
import { SERVER_URL } from 'src/config';
import { EmailService } from 'src/common/services/mail.service';
import { emailFormat } from 'src/common/utils/email.format';
import { UserLoginDTO } from '../types/login-user.dto';
import { ChangePasswordDTO, VerifyParamDTO } from '../types';

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
        throw new HttpException('Email is already used', HttpStatus.BAD_REQUEST);
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
        `${SERVER_URL}/auth/verify-account/${user._id}/${verifyCode}`,
      ),
    });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    // response
    return { message: 'Send OTP successfully', statusCode: 200 };
  }
  async verifyAccount(param: VerifyParamDTO) {
    try {
      const validId = mongoose.Types.ObjectId.isValid(param.id);
      if (!validId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userModel.findOne({
        _id: param.id,
        verifyCode: param.code,
        verifyCodeExpiredTime: { $gt: Date.now() },
      });
      if (!user) {
        console.log('here ..... -> ');
        throw new HttpException('VerifyCode has expired!', HttpStatus.BAD_REQUEST);
      }
      // verify account
      const newUser = await this.userModel.findOneAndUpdate(
        { _id: param.id },
        { $set: { verified: true, verifyCode: '', verifyCodeExpiredTime: 0 } },
        { new: true },
      );

      return { user: newUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async login(data: UserLoginDTO) {
    try {
      // Authenticate
      const user = await this.userModel
        .findOneAndUpdate({ email: data.email, verified: true }, { status: 'online' }, { new: true })
        .select(['_id', 'displayName', 'email', 'status', 'about', 'avatar', 'password', 'role']);
      if (!user) {
        throw new HttpException('Incorrect email!', 401);
      }
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Incorrect password!', 401);
      }
      return { user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async logout(id: string) {
    try {
      console.log('logout');
      const user = await this.userModel.findByIdAndUpdate({ _id: id }, { status: 'offline' });
      return { user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async forgotPassword(email: string) {
    try {
      const { verifyCode, verifyCodeExpiredTime } = this.otpService.generateOTP();
      // check user exist and assign verify-code
      const user = await this.userModel.findOneAndUpdate(
        { email },
        { $set: { verifyCode, verifyCodeExpiredTime } },
        { new: true },
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      // send mail
      const { error } = await this.emailService.sendMail({
        email,
        subject: 'Verify change password',
        html: emailFormat(
          'Verify change password!',
          'this is content',
          `${SERVER_URL}/auth/change-password/${user._id}/${verifyCode}`,
        ),
      });
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      // response
      return { message: 'Send OTP successfully', status: 200 };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async verifyChangePassword(data: VerifyParamDTO) {
    const isValidId = mongoose.Types.ObjectId.isValid(data.id);
    if (!isValidId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    // check user exists
    const user = await this.userModel.findOneAndUpdate(
      { _id: data.id, verifyCode: data.code, verifyCodeExpiredTime: { $gt: Date.now() } },
      { $set: { verifyCode: '', verifyCodeExpiredTime: 0 } },
    );
    console.log('user', user);

    if (!user) {
      throw new HttpException('Verify-code has expired', HttpStatus.BAD_REQUEST);
    }
    return { id: user._id };
  }
  async changePassword(data: ChangePasswordDTO, id: string) {
    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await this.userModel.findByIdAndUpdate({ _id: id }, { $set: { password: hashedPassword } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return { message: 'Change password successfully' };
  }
}


