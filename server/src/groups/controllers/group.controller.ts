import { Body, Controller, Post, Req } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDTO } from '../types';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create-group')
  async createGroup(@Req() req: any, @Body() data: CreateGroupDTO) {
    try {
      // assign id
      data.createdBy = req.user.id;
      return await this.groupService.createGroup(data);
    } catch (error) {
      throw error;
    }
  }
}
