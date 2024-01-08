import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { RelationShipStatus } from './types';

@Schema({ timestamps: true })
export class Relationship extends Document {
  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  users: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, default: RelationShipStatus.OK })
  status: RelationShipStatus;

  @Prop({ required: true, ref: 'User' })
  blockedBy: mongoose.Schema.Types.ObjectId;
}

export const RelationshipSchema = SchemaFactory.createForClass(Relationship);
