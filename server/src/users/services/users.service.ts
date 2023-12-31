import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { SerializeUser, EditProfileDTO } from '../types';
import { SERVER_URL } from 'src/config';

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
    const users = await this.userModel
      .find({ _id: { $ne: id }, verified: true })
      .select(['_id', 'displayName', 'email', 'status', 'about', 'avatar']);
    return users;
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
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
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
}
// },
// editProfile: async (req, res, next) => {
//   try {
//       const { id } = req.params;
//       const { displayName, about } = req.body;
//       if (!displayName) {
//           return res.status(200).json({ msg: 'Displayname is required', status: false });
//       }
//       const { error } = profileSchema.validate({ displayName, about });
//       if (error) {
//           return res.status(200).json({ msg: error.message, status: false });
//       }
//       const user = await userModel.findByIdAndUpdate(
//           id,
//           {
//               displayName,
//               about,
//           },
//           { new: true },
//       );
//       if (!user) {
//           return res.status(200).json({ msg: 'Can not find user with id ' + id, status: false });
//       }
//       return res.status(200).json({ displayName: user.displayName, about: user.about, status: true });
//   } catch (error) {
//       return res.status(200).json({ msg: error.message, status: false });
//   }
// },
