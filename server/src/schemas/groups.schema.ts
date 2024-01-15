import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true })
  groupName: string;

  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  members: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true, ref: 'User' })
  createdBy: mongoose.Schema.Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
