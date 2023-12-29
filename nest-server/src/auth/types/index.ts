import { IsNotEmpty } from 'class-validator';

export class VerifyParam {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  code: string;
}
