import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Messages } from 'src/schemas/messages.chema';
import { CallMessageDTO, ContactMessageDTO, FileUploadDTO, SeenMessagesDTO, TextMessageDTO } from '../types';
import { SERVER_URL } from 'src/config';
import { User } from 'src/schemas/users.chema';
import { MessageType } from 'src/schemas/types';
import { Group } from 'src/schemas/groups.schema';
@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name) private messageModel: Model<Messages>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
  ) {}
  async getAllMessages(id: string, contactId: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(contactId);
    if (!isValidId) {
      throw new HttpException('Invalid contact id', HttpStatus.BAD_REQUEST);
    }
    try {
      const contact = await this.userModel.findById(contactId);
      if (contact) {
        // get message with another user
        const messages = await this.messageModel
          .find({
            $or: [
              { from: id, to: contactId },
              { from: contactId, to: id },
            ],
          })
          .sort({ createdAt: 1 });
        // messages = messages.slice(Math.max(messages.length - 20, 0));
        for (let i = 1; i < messages.length; i++) {
          if (messages[i - 1].from.toString() === id || messages[i - 1].type === MessageType.SYSTEM) {
            messages[i].avatar = contact.avatar;
          }
        }
        if (messages[0].from.toString() === contactId) {
          messages[0].avatar = contact.avatar;
        }
        return { messages };
      } else {
        // get message from a group
        const groups = await this.groupModel
          .findOne({ _id: contactId })
          .populate({ path: 'members', select: '_id displayName avatar' });
        const messages = await this.messageModel
          .find({
            to: contactId,
          })
          .sort({ createdAt: 1 });
        let beforeMember = null;
        for (let i = 1; i < messages.length; i++) {
          groups.members.forEach((member: any) => {
            if (member._id.toString() === messages[i].from.toString() && member._id.toString() !== beforeMember) {
              messages[i].avatar = member.avatar;
              messages[i].authorName = member.displayName;
              beforeMember = member._id.toString();
            }
          });
        }
        return { messages };
      }
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
      const message = await this.messageModel.create({
        from: data.from,
        to: data.to,
        text: data.text,
        seens: [data.from],
      });
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
  async addVideoCallMessage(data: CallMessageDTO) {
    const isValidFrom = mongoose.Types.ObjectId.isValid(data.from);
    const isValidFrom_1 = mongoose.Types.ObjectId.isValid(data.to);
    const isValidFrom_2 = mongoose.Types.ObjectId.isValid(data.owner);
    if (!isValidFrom || !isValidFrom_1 || !isValidFrom_2) {
      throw new HttpException('Invalid id field', HttpStatus.BAD_REQUEST);
    }
    if (data.to === data.owner) {
      data.to = data.from;
    }
    try {
      const message = await this.messageModel.create({
        from: data.owner,
        to: data.to,
        text: data.text,
        type: MessageType.VIDEO_CALL,
      });
      if (message) {
        return { message };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async addVoiceCallMessage(data: CallMessageDTO) {
    const isValidFrom = mongoose.Types.ObjectId.isValid(data.from);
    if (!isValidFrom) {
      throw new HttpException('Invalid From field', HttpStatus.BAD_REQUEST);
    }
    if (data.to === data.owner) {
      data.to = data.from;
    }
    try {
      const message = await this.messageModel.create({
        from: data.owner,
        to: data.to,
        text: data.text,
        type: MessageType.VOICE_CALL,
      });
      if (message) {
        return { message };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async addContactMessage(data: ContactMessageDTO) {
    const isValidFrom = mongoose.Types.ObjectId.isValid(data.from);
    if (!isValidFrom) {
      throw new HttpException('Invalid From field', HttpStatus.BAD_REQUEST);
    }
    try {
      const message = await this.messageModel.create({
        from: data.from,
        to: data.to,
        contact: data.contact,
        type: MessageType.CONTACT,
        seens: [data.from],
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
        seens: [from],
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
        seens: [from],
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
        seens: [from],
      });
      if (!voiceMessage) {
        throw new HttpException('Error in save message', HttpStatus.BAD_REQUEST);
      }
      return { message: voiceMessage };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async seenMessages({ id, from, to }: SeenMessagesDTO) {
    console.log('seen message');

    try {
      const contact = await this.userModel.findOne({ _id: from });
      let findOption = null;
      if (contact) {
        findOption = {
          $or: [
            { from: from, to: to },
            { from: to, to: from },
          ],
          seens: { $nin: [id] },
        };
      } else {
        findOption = {
          to: from,
          seens: { $nin: [id] },
        };
      }
      const messages = await this.messageModel.updateMany(findOption, { $addToSet: { seens: id } });
      if (!messages) {
        throw new HttpException('Error in seen message', HttpStatus.BAD_REQUEST);
      }
      console.log(messages);
      return { contactId: from };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
