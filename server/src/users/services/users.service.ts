import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { EditProfileDTO, ContactDTO } from '../types';
import { SERVER_URL } from 'src/config';
import { Messages } from 'src/schemas/messages.chema';
import { UserRole, UserStatus } from 'src/schemas/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Messages.name) private messagesModel: Model<Messages>,
  ) {}
  isValidID(id: string): boolean {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    return validId;
  }
  async getUserById(id: string) {
    if (!this.isValidID(id)) {
      return;
    }
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['_id', 'displayName', 'email', 'avatar', 'status', 'about']);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async getAllUsers(id: string) {
    const users = await this.userModel
      .find({ _id: { $ne: id }, verified: true, role: UserRole.USER })
      .select(['_id', 'displayName', 'email', 'status', 'about', 'avatar']);
    return users;
  }
  async getAllContacts(id: string) {
    if (!this.isValidID(id)) {
      return;
    }
    const recentMessages = await this.messagesModel
      .find({
        $or: [{ from: id }, { to: id }],
      })
      .populate('from')
      .populate('to')
      .sort({ createdAt: -1 });
    // serialize
    const flag = []; // contains ignore-id
    const contacts: ContactDTO[] = [];
    recentMessages.forEach((mes: any) => {
      // from: A  to: B
      // from: B  to: A
      if (!flag.includes(mes.from._id.toString()) && mes.from._id.toString() !== id) {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _doc: { password, verified, verifyCode, verifyCodeExpiredTime, createdAt, updatedAt, ...contact },
        } = mes.from;
        contacts.push({
          contact: contact,
          recentMessage: {
            type: mes.type,
            text: mes.text,
            createdAt: mes.createdAt,
          },
        });
        flag.push(mes.from._id.toString());
      }
      if (!flag.includes(mes.to._id.toString()) && mes.to._id.toString() !== id) {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _doc: { password, verified, verifyCode, verifyCodeExpiredTime, createdAt, updatedAt, ...contact },
        } = mes.to;
        contacts.push({
          contact: contact,
          recentMessage: {
            type: mes.type,
            text: mes.text,
            createdAt: mes.createdAt,
          },
        });
        flag.push(mes.to._id.toString());
      }
    });

    return contacts;
  }
  async setAvatar({ id, file }: { id: string; file: string }) {
    if (!id) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        avatar: `${SERVER_URL}/uploads/avatars/${file}`,
      },
      { new: true },
    );
    if (!user) {
      throw new HttpException('Error in update user', HttpStatus.BAD_REQUEST);
    }
    return { avatar: user.avatar };
  }
  async editProfile(data: EditProfileDTO, id: string) {
    if (!this.isValidID(id)) {
      return;
    }
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { displayName: data.displayName, about: data.about },
      { new: true },
    );
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return { displayName: user.displayName, about: user.about };
  }
  async getUsers(usersId: string[]) {
    try {
      const users = await this.userModel.find({ _id: { $in: usersId } });
      return { users };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async setOnlineUser(userID: string) {
    try {
      const users = await this.userModel.findOneAndUpdate({ _id: userID }, { status: UserStatus.ONLINE });
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async setOfflineUser(userID: string) {
    try {
      const users = await this.userModel.findOneAndUpdate({ _id: userID }, { status: UserStatus.OFFLINE });
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
