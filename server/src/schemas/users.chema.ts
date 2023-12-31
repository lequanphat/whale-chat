import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: '' })
  about: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: 'offline' }) // online, offline, block
  status: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: '' })
  verifyCode: string;

  @Prop({ default: 0 })
  verifyCodeExpiredTime: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
