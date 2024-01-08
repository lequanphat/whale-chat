import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { createFriendRequestDTO, deleteFriendRequestDTO } from '../types';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactServic: ContactService) {}
  // @Get('admin')
  // @Roles(['user', 'admin'])
  // async adminRouter() {
  //   return 'admin router ok';
  // }
  // @Get('user')
  // @Roles(['user'])
  // async userRouter() {
  //   return 'user router ok';
  // }
  @Get('get-all-users')
  async getAllUsers(@Req() req: any) {
    try {
      const id = req.user.id;
      const data = await this.contactServic.getAllUsers(id);
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
  @Get('get-all-friend-requests')
  async getAllFriendRequests(@Req() req: any) {
    try {
      const data = await this.contactServic.getAllFriendRequests(req.user.id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Get('get-all-friend-requests-from-self')
  async getAllFriendRequestsFromSelf(@Req() req: any) {
    try {
      const data = await this.contactServic.getAllFriendRequestsFromSelf(req.user.id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
