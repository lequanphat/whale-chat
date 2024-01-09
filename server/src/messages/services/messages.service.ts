import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Messages } from 'src/schemas/messages.chema';
import { FileUploadDTO, TextMessageDTO } from '../types';
import { SERVER_URL } from 'src/config';
import { User } from 'src/schemas/users.chema';
import { MessageType } from 'src/schemas/types';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name) private messageModel: Model<Messages>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async getAllMessages(id: string, contactId: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(contactId);
    if (!isValidId) {
      throw new HttpException('Invalid contact id', HttpStatus.BAD_REQUEST);
    }
    try {
      let messages = await this.messageModel
        .find({
          $or: [
            { from: id, to: contactId },
            { from: contactId, to: id },
          ],
        })
        .sort({ createdAt: 1 });
      console.log(messages);

      messages = messages.slice(Math.max(messages.length - 20, 0));
      if (messages.length > 0) {
        const contact = await this.userModel.findById(contactId);
        for (let i = 1; i < messages.length; i++) {
          if (messages[i - 1].from.toString() === id || messages[i - 1].type === MessageType.SYSTEM) {
            messages[i].avatar = contact.avatar;
          }
        }
        if (messages[0].from.toString() === contactId) {
          messages[0].avatar = contact.avatar;
        }
      }
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
  async addSystemMessage(data: TextMessageDTO) {
    const isValidFrom = mongoose.Types.ObjectId.isValid(data.from);
    if (!isValidFrom) {
      throw new HttpException('Invalid From field', HttpStatus.BAD_REQUEST);
    }
    try {
      const message = await this.messageModel.create({
        from: data.from,
        to: data.to,
        text: data.text,
        type: MessageType.SYSTEM,
      });
      if (message) {
        return { message };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addImageMessage({ file, from, to, text }: FileUploadDTO) {
    try {
      const imageMessage = await this.messageModel.create({
        from,
        to,
        type: MessageType.IMAGE,
        image: `${SERVER_URL}/uploads/images/${file}`,
      });
      if (!imageMessage) {
        throw new HttpException('Error in save message', HttpStatus.BAD_REQUEST);
      }
      if (text) {
        const textMessage = await this.messageModel.create({ from, to, text });
        if (textMessage) {
          return { messages: [imageMessage, textMessage], status: true };
        }
      }
      return { message: imageMessage, status: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async addDocMessage({ file, from, to, text }: FileUploadDTO, originalName: string) {
    try {
      const docMessage = await this.messageModel.create({
        from,
        to,
        type: MessageType.DOC,
        doc: `${SERVER_URL}/uploads/docs/${file}`,
        text: originalName,
      });
      if (!docMessage) {
        throw new HttpException('Error in save message', HttpStatus.BAD_REQUEST);
      }
      if (text) {
        const textMessage = await this.messageModel.create({ from, to, text });
        if (textMessage) {
          return { messages: [docMessage, textMessage] };
        }
      }
      return { message: docMessage };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async addVoiceMessage({ file, from, to }: FileUploadDTO) {
    try {
      const voiceMessage = await this.messageModel.create({
        from,
        to,
        type: MessageType.VOICE,
        voice: `${SERVER_URL}/uploads/audios/${file}`,
      });
      if (!voiceMessage) {
        throw new HttpException('Error in save message', HttpStatus.BAD_REQUEST);
      }
      return { message: voiceMessage };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
