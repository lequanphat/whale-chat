import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Messages extends Document {
  @Prop({ required: true, default: 'text' })
  type: string;

  @Prop({ default: '' })
  text: string;

  @Prop({ required: true, ref: 'User' })
  from: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  to: mongoose.Schema.Types.ObjectId;
  @Prop()
  image: string;
  @Prop() // online, offline, block
  doc: string;
  @Prop()
  voice: string;
  @Prop()
  avatar: string;
}

export const Messageschema = SchemaFactory.createForClass(Messages);
