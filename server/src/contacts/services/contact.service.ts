import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { FriendRequest } from 'src/schemas/friendrequest.chema';
import { Relationship } from 'src/schemas/relationship.chema';
import { createFriendRequestDTO } from '../types';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequest>,
    @InjectModel(Relationship.name) private relationshipModel: Model<Relationship>,
  ) {}

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
  async getAllFriendRequests(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const friendRequests = await this.friendRequestModel
      .find({ receiveId: id })
      .populate({
        path: 'sendId',
        select: '_id displayName avatar', // Chỉ định các trường muốn lấy
      })
      .sort({ createdAt: 1 });
    return friendRequests;
  }
  async getAllFriendRequestsFromSelf(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const friendRequests = await this.friendRequestModel.find({ sendId: id }).sort({ createdAt: -1 });
    return friendRequests;
  }
}
