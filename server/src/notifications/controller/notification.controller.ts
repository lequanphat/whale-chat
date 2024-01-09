import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { SendNotificationDTO } from '../types';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Roles(['admin'])
  @Post('send-notification')
  async sendNotification(@Body() data: SendNotificationDTO) {
    try {
      return await this.notificationService.sendNotification(data);
    } catch (error) {
      throw error;
    }
  }
  @Get('all-notifications')
  async getAllNotifications(@Req() req: any) {
    try {
      return await this.notificationService.getAllNotification(req.user.id);
    } catch (error) {
      throw error;
    }
  }
  @Delete('delete/:id')
  async deleteNotification(@Req() req: any, @Param('id') id: string) {
    console.log(id);
    try {
      return await this.notificationService.deleteNotification({ user: req.user, id });
    } catch (error) {
      throw error;
    }
  }
  @Get('seen/:id')
  async seenNotification(@Req() req: any, @Param('id') id: string) {
    try {
      return await this.notificationService.seenNotification({ userId: req.user.id, notificationId: id });
    } catch (error) {
      throw error;
    }
  }
}
