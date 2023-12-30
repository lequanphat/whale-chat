import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { SerializeUser } from '../types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return plainToClass(SerializeUser, user, { excludeExtraneousValues: true });
  }
  async getAllUsers(id: string) {
    const users = await this.userModel.find({ _id: { $ne: id } }).exec();
    return users.map((user) => plainToClass(SerializeUser, user, { excludeExtraneousValues: true }));
  }
}
