import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { TextMessageDTO } from '../types';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}
  @Get(':contactId')
  async getAllMessages(@Param('contactId') contactId: string, @Req() req: any, @Res() res: Response) {
    try {
      const { messages } = await this.messageService.getAllMessages(req.user.id, contactId);
      return res.status(HttpStatus.OK).json({ messages });
    } catch (error) {
      return res.status(HttpStatus.OK).json({ error: error.message });
    }
  }
  @Post('add-text-message')
  async addTextMessage(@Body() data: TextMessageDTO, @Req() req: any, @Res() res: Response) {
    data.from = req.user.id;
    try {
      const { message } = await this.messageService.addTextMessage(data);
      return res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      return res.status(HttpStatus.OK).json({ error: error.message });
    }
  }
}
