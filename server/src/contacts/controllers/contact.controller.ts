import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { createFriendRequestDTO, deleteFriendRequestDTO } from '../types';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactServic: ContactService) {}
  @Get('all-contacts')
  async getAllContacts(@Req() req: any) {
    try {
      const id = req.user.id;
      const data = await this.contactServic.getAllContacts(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Get('get-recommended-users')
  async getRecommendedUsers(@Req() req: any) {
    try {
      const id = req.user.id;
      const data = await this.contactServic.getRecommendedUsers(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Get('search-users/:search')
  async searchUsers(@Req() req: any, @Param('search') searchText: string) {
    try {
      const id = req.user.id;
      const data = await this.contactServic.searchUsers({ id, searchText });
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Post('create-friend-request')
  async createFriendRequest(@Req() req: any, @Body() body: createFriendRequestDTO) {
    try {
      body.sendId = req.user.id; // assign id
      const data = await this.contactServic.createFriendRequest(body);
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Post('delete-friend-request')
  async deleteFriendRequest(@Req() req: any, @Body() body: deleteFriendRequestDTO) {
    try {
      const id = req.user.id;
      const data = await this.contactServic.deleteFriendRequest({ id, data: body });
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Post('accept-friend-request')
  async acceptFriendRequest(@Req() req: any, @Body('friendRequestId') friendRequestId: string) {
    try {
      const id = req.user.id;
      const data = await this.contactServic.acceptFriendRequest({ id, friendRequestId });
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Get('get-all-friend-requests')
  async getAllFriendRequests(@Req() req: any) {
    try {
      const data = await this.contactServic.getAllFriendRequests(req.user.id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
