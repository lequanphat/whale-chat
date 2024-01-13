import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from 'src/schemas/groups.schema';
import { CreateGroupDTO } from '../types';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private readonly groupModel: Model<Group>) {}

  async createGroup(data: CreateGroupDTO) {
    try {
      const group = await this.groupModel.create({
        groupName: data.groupName,
        members: data.members,
        createdBy: data.createdBy,
      });
      if (!group) {
        throw new HttpException('Can not create this group', HttpStatus.BAD_REQUEST);
      }
      return group;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getMemberOfGroup(groupId: string) {
    try {
      const groups = await this.groupModel
        .findOne({ _id: groupId })
        .populate({ path: 'members', select: '_id displayName avatar' });
      return { members: groups.members };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
