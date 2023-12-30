import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class VerifyParam {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  code: string;
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
