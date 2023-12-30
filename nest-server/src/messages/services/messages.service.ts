import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Messages } from 'src/schemas/messages.chema';
import { TextMessageDTO } from '../types';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Messages.name) private messageModel: Model<Messages>) {}
  async getAllMessages(id: string, contactId: string) {
    console.log('id', id);

    const isValidId = mongoose.Types.ObjectId.isValid(contactId);
    if (!isValidId) {
      throw new HttpException('Invalid contact id', HttpStatus.BAD_REQUEST);
    }
    try {
      const messages = await this.messageModel
        .find({
          $or: [
            { from: id, to: contactId },
            { from: contactId, to: id },
          ],
        })
        .sort({ createdAt: 1 });

      //   messages = messages.slice(Math.max(messages.length - 20, 0));
      //   if (messages.length > 0) {
      //     for (let i = 1; i < messages.length; i++) {
      //       if (messages[i - 1].from.toString() === id) {
      //         messages[i].avatar = 'http://localhost:2411/defaults/default_avatar.jpeg';
      //       }
      //     }
      //     if (messages[0].from.toString() === contactId) {
      //       messages[0].avatar = 'http://localhost:2411/defaults/default_avatar.jpeg';
      //     }
      //   }
      return { messages };
    } catch (error) {
      throw new HttpException('Can not get messages', HttpStatus.BAD_REQUEST);
    }
  }
  async addTextMessage(data: TextMessageDTO) {
    const isValidFrom = mongoose.Types.ObjectId.isValid(data.from);
    if (!isValidFrom) {
      throw new HttpException('Invalid From field', HttpStatus.BAD_REQUEST);
    }
    try {
      const message = await this.messageModel.create({ from: data.from, to: data.to, text: data.text });
      if (message) {
        return { message };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
