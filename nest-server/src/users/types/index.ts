import { Expose } from 'class-transformer';

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
