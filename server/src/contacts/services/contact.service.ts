import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { FriendRequest } from 'src/schemas/friendrequest.chema';
import { Relationship } from 'src/schemas/relationship.chema';
import { FriendRequestType, createFriendRequestDTO, deleteFriendRequestDTO } from '../types';
import { User } from 'src/schemas/users.chema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequest>,
    @InjectModel(Relationship.name) private relationshipModel: Model<Relationship>,
  ) {}
  async getRecommendedUsers(id: string) {
    try {
      const users = await this.userModel
        .find({ _id: { $ne: id } })
        .select(['_id', 'displayName', 'email', 'status', 'avatar'])
        .sort({ createdAt: -1 })
        .limit(5);

      const friendRequests = await this.friendRequestModel
        .find({
          $or: [{ sendId: id }, { receiveId: id }],
        })
        .select(['_id', 'sendId', 'receiveId']);

      //
      users.forEach((user: any, index) => {
        friendRequests.forEach((friendRequest) => {
          if (
            user._id.toString() === friendRequest.sendId.toString() ||
            user._id.toString() === friendRequest.receiveId.toString()
          ) {
            users.splice(index, 1);
          }
        });
      });
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async searchUsers({ id, searchText }: { id: string; searchText: string }) {
    try {
      const users = await this.userModel
        .find({ _id: { $ne: id }, displayName: { $regex: new RegExp(searchText, 'i') } })
        .select(['_id', 'displayName', 'email', 'status', 'avatar']);
      const friendRequests = await this.friendRequestModel
        .find({
          $or: [{ sendId: id }, { receiveId: id }],
        })
        .select(['_id', 'sendId', 'receiveId']);
      //
      users.forEach((user: any) => {
        friendRequests.forEach((friendRequest) => {
          if (
            user._id.toString() === friendRequest.sendId.toString() ||
            user._id.toString() === friendRequest.receiveId.toString()
          ) {
            user.status = 'Pending';
          } else {
          }
        });
      });

      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createFriendRequest(data: createFriendRequestDTO) {
    const isValidSendId = mongoose.Types.ObjectId.isValid(data.sendId);
    if (!isValidSendId) {
      throw new HttpException('Invalid sendId', HttpStatus.BAD_REQUEST);
    }
    const isValidReceiveId = mongoose.Types.ObjectId.isValid(data.receiveId);
    if (!isValidReceiveId) {
      throw new HttpException('Invalid receiveId', HttpStatus.BAD_REQUEST);
    }
    if (data.receiveId === data.sendId) {
      throw new HttpException('sendId must be different with receiveId', HttpStatus.BAD_REQUEST);
    }
    try {
      const friendRequestExists = await this.friendRequestModel.findOne({
        sendId: data.sendId,
        receiveId: data.receiveId,
      });
      if (friendRequestExists) {
        throw new HttpException('friend request exists', HttpStatus.BAD_REQUEST);
      }
      const friendRequest = await this.friendRequestModel.create({
        sendId: data.sendId,
        receiveId: data.receiveId,
        text: data.text,
      });
      if (!friendRequest) {
        throw new HttpException('Can not create friend request', HttpStatus.BAD_REQUEST);
      }
      return friendRequest;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteFriendRequest({ id, data }: { id: string; data: deleteFriendRequestDTO }) {
    const isValidSendId = mongoose.Types.ObjectId.isValid(data.sendId);
    if (!isValidSendId) {
      throw new HttpException('Invalid sendId', HttpStatus.BAD_REQUEST);
    }
    const isValidReceiveId = mongoose.Types.ObjectId.isValid(data.receiveId);
    if (!isValidReceiveId) {
      throw new HttpException('Invalid receiveId', HttpStatus.BAD_REQUEST);
    }
    if (data.receiveId === data.sendId) {
      throw new HttpException('sendId must be different with receiveId', HttpStatus.BAD_REQUEST);
    }
    try {
      const friendRequest = await this.friendRequestModel.findOneAndDelete({
        sendId: data.sendId,
        receiveId: data.receiveId,
      });
      if (!friendRequest) {
        throw new HttpException('Can not delete friend request', HttpStatus.BAD_REQUEST);
      }
      let type = FriendRequestType.RECEIVE;
      if (id === data.receiveId) {
        // send notification to sent user
        console.log('send notification');
      } else {
        type = FriendRequestType.SEND;
      }
      return { friendRequest, type };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllFriendRequests(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const friendRequests = await this.friendRequestModel
      .find({ receiveId: id })
      .populate({
        path: 'sendId',
        select: '_id displayName avatar',
      })
      .sort({ createdAt: 1 });
    return friendRequests;
  }
  async getAllFriendRequestsFromSelf(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const friendRequests = await this.friendRequestModel
      .find({ sendId: id })
      .populate({
        path: 'receiveId',
        select: '_id displayName avatar',
      })
      .sort({ createdAt: -1 });
    return friendRequests;
  }
}
