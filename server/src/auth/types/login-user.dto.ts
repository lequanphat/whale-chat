import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;
  @IsString()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(/^[a-zA-Z0-9]{6,20}$/, {
    message: 'Password only contains numbers and characters',
  })
  @IsNotEmpty({ message: 'Please provide your password' })
  @Expose()
  password: string;
  about?: string;
  avatar?: string;
  verified?: boolean;
  verifyCode?: string;
  verifyCodeExpiredTime?: number;
}
