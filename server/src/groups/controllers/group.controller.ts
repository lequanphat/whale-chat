import { Body, Controller, Get, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadStorage } from 'src/messages/utils/uploadStorage';
import { MessagesService } from 'src/messages/services/messages.service';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly messageService: MessagesService,
  ) {}

  @Post('create-group')
  @UseInterceptors(FileInterceptor('groupAvatar', uploadStorage('avatars')))
  async createGroup(@Req() req: any, @Body() data: any) {
    try {
      // assign id
      const group = await this.groupService.createGroup({
        groupName: data.groupName,
        members: JSON.parse(data.members),
        createdBy: req.user.id,
        avatar: req.fileName,
      });
      await this.messageService.addSystemMessage({
        from: req.user.id,
        to: group._id,
        text: `Group have been created successfully`,
      });
      return group;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
  @Get('members/:id')
  async getMemberOfGroup(@Param('id') groupId: string) {
    try {
      return await this.groupService.getMemberOfGroup(groupId);
    } catch (error) {
      throw error;
    }
  }
}
