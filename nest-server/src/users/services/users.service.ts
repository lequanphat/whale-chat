import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { UserRegiserDTO } from '../../auth/types/register-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async register(registerUser: UserRegiserDTO) {
    const user = new this.userModel(registerUser);
    try {
      const newUser = await user.save();
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getUser(id: string) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => {
      return {
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
      };
    });
  }
}
