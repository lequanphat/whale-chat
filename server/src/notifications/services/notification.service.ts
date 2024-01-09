import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Notification } from 'src/schemas/notification.chema';
import { DeleteNotificationDTO, SendNotificationDTO } from '../types';
import { UserRole } from 'src/schemas/types';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  async sendNotification(data: SendNotificationDTO) {
    const isValidId = mongoose.Types.ObjectId.isValid(data.to);
    if (!isValidId) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    try {
      const notification = await this.notificationModel.create({
        title: data.title,
        content: data.content,
        to: data.to,
      });
      if (!notification) {
        throw new HttpException('Can not create notification', HttpStatus.BAD_REQUEST);
      }
      return notification;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllNotification(id: string) {
    const notifications = await this.notificationModel
      .find({ to: id })
      .select(['_id', 'title', 'content', 'to', 'createdAt', 'seen'])
      .sort({ createdAt: -1 });
    return notifications;
  }
  async deleteNotification(data: DeleteNotificationDTO) {
    try {
      const notification = await this.notificationModel.findOne({ _id: data.id });
      if (!notification) {
        throw new HttpException(`Can not find notification with ${data.id}`, HttpStatus.BAD_REQUEST);
      }
      if (data.user.id === notification.to.toString() || data.user.role === UserRole.ADMIN) {
        await this.notificationModel.findOneAndDelete({ _id: data.id });
        return { _id: notification._id };
      } else {
        throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async seenNotification({ userId, notificationId }: { userId: string; notificationId: string }) {
    try {
      const notification = await this.notificationModel.findOne({ _id: notificationId });
      if (!notification) {
        throw new HttpException(`Can not find notification with ${notificationId}`, HttpStatus.BAD_REQUEST);
      }
      if (userId === notification.to.toString()) {
        await this.notificationModel.findOneAndUpdate({ _id: notificationId }, { seen: true });
        return { _id: notification._id };
      }
      throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
