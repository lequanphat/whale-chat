import { Expose } from 'class-transformer';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

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
export class EditProfileDTO {
  @IsString({ message: 'The name should be a string' })
  @Matches(/^[^!@#$%^&*()=0-9/\\}{_+;:"'><.,\][]+$/, {
    message: 'The name contains only letters and spaces',
  })
  @MinLength(8, { message: 'The name must have at least 8 characters' })
  @MaxLength(20, {
    message: 'The name can only contain a maximum of 20 characters',
  })
  @Expose()
  displayName: string;
  @Expose()
  @MaxLength(100, {
    message: 'The about can only contain a maximum of 100 characters',
  })
  about: string;
}
