import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { FriendRequest } from 'src/schemas/friendrequest.chema';
import { Relationship } from 'src/schemas/relationship.chema';
import { FriendRequestType, createFriendRequestDTO, deleteFriendRequestDTO } from '../types';
import { User } from 'src/schemas/users.chema';
import { Messages } from 'src/schemas/messages.chema';
import { MessageType, UserRole } from 'src/schemas/types';
import { Group } from 'src/schemas/groups.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequest>,
    @InjectModel(Relationship.name) private relationshipModel: Model<Relationship>,
    @InjectModel(Messages.name) private messageModel: Model<Messages>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
  ) {}
  async getAllContacts(id: string) {
    try {
      const relationalContacts = await this.relationshipModel
        .aggregate([
          {
            $match: {
              users: { $in: [mongoose.Types.ObjectId.createFromHexString(id)] },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'users',
              foreignField: '_id',
              as: 'details',
            },
          },
          {
            $project: {
              'details._id': 1,
              'details.displayName': 1,
              'details.email': 1,
              'details.about': 1,
              'details.avatar': 1,
              'details.status': 1,
            },
          },
        ])
        .exec();

      const contacts = [];
      relationalContacts.forEach((contact) => {
        if (contact.details[0]._id.toString() !== id) {
          contacts.push(contact.details[0]);
        } else if (contact.details[1]._id.toString() !== id) {
          contacts.push(contact.details[1]);
        }
      });
      const responeContacts = [];
      for (const contact of contacts) {
        let messages = await this.messageModel
          .find({
            $or: [
              { from: id, to: contact._id },
              { from: contact._id, to: id },
            ],
            seen: false,
          })
          .sort({ createdAt: -1 });
        let totalUnSeen = messages.length;
        if (totalUnSeen === 0) {
          messages = await this.messageModel
            .find({
              $or: [
                { from: id, to: contact._id },
                { from: contact._id, to: id },
              ],
            })
            .sort({ createdAt: -1 });
        } else {
          if (messages[0].from.toString() === id) {
            totalUnSeen = 0;
          }
        }
        //
        responeContacts.push({ contact: { ...contact, type: 'user' }, recentMessage: messages[0], total: totalUnSeen });
      }
      const groups = await this.groupModel.find({ members: id }).select(['_id', 'groupName', 'createdBy', 'members']);

      for (const group of groups) {
        const messages = await this.messageModel
          .find({
            to: group._id,
          })
          .sort({ createdAt: -1 });
        responeContacts.push({
          contact: group,
          recentMessage: messages[0],
          total: 2,
        });
      }

      return responeContacts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getRecommendedUsers(id: string) {
    try {
      let users = await this.userModel
        .find({ _id: { $ne: id }, role: UserRole.USER })
        .select(['_id', 'displayName', 'email', 'status', 'avatar'])
        .sort({ createdAt: -1 });

      const friendRequests = await this.friendRequestModel
        .find({
          $or: [{ sendId: id }, { receiveId: id }],
        })
        .select(['_id', 'sendId', 'receiveId']);
      const relationships = await this.relationshipModel.find({ users: { $in: [id] } });
      //
      const idArray = [];
      friendRequests.forEach((friendRequest) => {
        idArray.push(friendRequest.sendId.toString());
        idArray.push(friendRequest.receiveId.toString());
      });
      relationships.forEach((relationship) => {
        idArray.push(relationship.users[0].toString());
        idArray.push(relationship.users[1].toString());
      });
      users = users.filter((user) => !idArray.includes(user._id.toString()));

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
      const relationships = await this.relationshipModel.find({ users: { $in: [id] } });

      const friendRequestIds = [];
      const relationshipIds = [];
      friendRequests.forEach((friendRequest) => {
        friendRequestIds.push(friendRequest.sendId.toString());
        friendRequestIds.push(friendRequest.receiveId.toString());
      });
      relationships.forEach((relationship) => {
        relationshipIds.push(relationship.users[0].toString());
        relationshipIds.push(relationship.users[1].toString());
      });
      users.forEach((user: any) => {
        if (friendRequestIds.includes(user._id.toString())) {
          user.status = 'Pending';
        } else if (relationshipIds.includes(user._id.toString())) {
          user.status = 'Friend';
        }
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
      const relationshipExists = await this.relationshipModel.findOne({
        $or: [{ users: { $all: [data.sendId, data.receiveId] } }, { users: { $all: [data.receiveId, data.sendId] } }],
      });
      if (relationshipExists) {
        throw new HttpException('relationship exists', HttpStatus.BAD_REQUEST);
      }
      let friendRequest = await this.friendRequestModel.create({
        sendId: data.sendId,
        receiveId: data.receiveId,
        text: data.text,
      });
      if (!friendRequest) {
        throw new HttpException('Can not create friend request', HttpStatus.BAD_REQUEST);
      }
      friendRequest = await this.friendRequestModel.findOne({ _id: friendRequest._id }).populate({
        path: 'sendId',
        select: '_id displayName avatar about status email',
      });
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
  async acceptFriendRequest({ id, friendRequestId }: { id: string; friendRequestId: string }) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('Invalid sendId', HttpStatus.BAD_REQUEST);
    }
    try {
      const friendRequest = await this.friendRequestModel.findOne({ _id: friendRequestId });
      if (!friendRequest) {
        throw new HttpException('Can not find request', HttpStatus.BAD_REQUEST);
      }
      if (id !== friendRequest.receiveId.toString()) {
        throw new HttpException('You can not accept this request', HttpStatus.BAD_REQUEST);
      }
      // delete friend request
      await this.friendRequestModel.findOneAndDelete({ _id: friendRequestId });
      // create relationship between 2 users
      await this.relationshipModel.create({
        users: [id, friendRequest.sendId],
      });
      // send first message
      const firstMessage = await this.messageModel.create({
        from: id,
        to: friendRequest.sendId,
        type: MessageType.SYSTEM,
        text: 'We have become friends',
      });
      // get user
      const contact = await this.userModel
        .findOne({ _id: friendRequest.sendId })
        .select(['_id', 'displayName', 'email', 'status', 'about', 'avatar']);
      // response
      return { id: friendRequestId, contact, firstMessage };
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
        select: '_id displayName avatar about status email',
      })
      .sort({ createdAt: 1 });
    const friendRequestsFromSelf = await this.friendRequestModel
      .find({ sendId: id })
      .populate({
        path: 'receiveId',
        select: '_id displayName avatar about status email',
      })
      .sort({ createdAt: -1 });
    return { friendRequests, friendRequestsFromSelf };
  }
}
