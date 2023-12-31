import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class VerifyParamDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  code: string;
}
export class ChangePasswordDTO {
  @IsString()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(/^[a-zA-Z0-9]{6,20}$/, {
    message: 'Password only contains numbers and characters',
  })
  @IsNotEmpty({ message: 'Please provide your password' })
  @Expose()
  password: string;
  @IsNotEmpty()
  @Expose()
  token: string;
}
export class SerializeUser {
  @Expose()
  _id: string;
  @Expose()
  displayName: string;
  @Expose()
  email: string;
  @Expose()
  avatar: string;
  @Expose()
  about: string;
  @Expose()
  status: string;
}

export class EmailDTO {
  @Expose()
  @IsEmail()
  email: string;
}
