import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MessageType } from './types';

export class ContactType {
  _id: string;
  avatar: string;
  displayName: string;
  email: string;
}

@Schema({ timestamps: true })
export class Messages extends Document {
  @Prop({ required: true, default: MessageType.TEXT })
  type: MessageType;

  @Prop({ default: '' })
  text: string;

  @Prop({ required: true, ref: 'User' })
  from: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  to: mongoose.Schema.Types.ObjectId;

  @Prop()
  image: string;

  @Prop()
  doc: string;

  @Prop()
  voice: string;

  @Prop()
  contact: ContactType;

  @Prop()
  avatar: string;
  @Prop()
  authorName: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    // default: function () {
    //   return [this.from];
    // },
    default: [],
  })
  seens: mongoose.Schema.Types.ObjectId[];
}

export const Messageschema = SchemaFactory.createForClass(Messages);
