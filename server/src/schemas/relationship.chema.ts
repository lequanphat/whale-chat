import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Relationship extends Document {
  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  users: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, default: false })
  isBlocked: boolean;

  @Prop({ ref: 'User' })
  blockedBy: mongoose.Schema.Types.ObjectId;
}

export const RelationshipSchema = SchemaFactory.createForClass(Relationship);
