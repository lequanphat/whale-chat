import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class FriendRequest extends Document {
  @Prop({ required: true, ref: 'User' })
  sendId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  receiveId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  text: string;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
