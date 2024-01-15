import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @MinLength(8, { message: 'GroupName must have at least 8 characters' })
  @MaxLength(40, { message: 'GroupName must not exceed 40 characters' })
  groupName: string;
  @IsNotEmpty()
  @IsArray()
  members: string[];
  @IsString()
  avatar?: string;
  @IsString()
  createdBy: string;
}
