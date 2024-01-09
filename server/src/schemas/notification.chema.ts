import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'User' })
  to: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, default: false })
  seen: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
