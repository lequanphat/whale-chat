import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { ContactMessageDTO, TextMessageDTO } from '../types';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadStorage } from '../utils/uploadStorage';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('add-text-message')
  async addTextMessage(@Body() data: TextMessageDTO, @Req() req: any, @Res() res: Response) {
    data.from = req.user.id;
    try {
      const { message } = await this.messageService.addTextMessage(data);
      return res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      throw error;
    }
  }
  @Post('add-system-message')
  async addSystemMessage(@Body() data: TextMessageDTO, @Req() req: any, @Res() res: Response) {
    data.from = req.user.id;
    try {
      const { message } = await this.messageService.addSystemMessage(data);
      return res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      throw error;
    }
  }
  @Post('add-contact-message')
  async addContactMessage(@Body() data: ContactMessageDTO, @Req() req: any) {
    data.from = req.user.id;
    try {
      const { message } = await this.messageService.addContactMessage(data);
      return message;
    } catch (error) {
      throw error;
    }
  }

  @Post('add-image-message')
  @UseInterceptors(FileInterceptor('image', uploadStorage('images')))
  async addImageMessage(@Req() req: any, @Res() res: Response) {
    const { to, text } = req.body;
    if (!req.fileName) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'File not found!' });
    }
    try {
      const data = await this.messageService.addImageMessage({ file: req.fileName, from: req.user.id, to, text });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
  @Post('add-doc-message')
  @UseInterceptors(FileInterceptor('doc', uploadStorage('docs')))
  async addDocMessage(@Req() req: any, @Res() res: Response) {
    const { to, text } = req.body;
    if (!req.fileName || !req.originalName) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'File not found!' });
    }
    try {
      const data = await this.messageService.addDocMessage(
        { file: req.fileName, from: req.user.id, to, text },
        req.originalName,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
  @Post('add-voice-message')
  @UseInterceptors(FileInterceptor('audio', uploadStorage('audios')))
  async addVoiceMessage(@Req() req: any, @Res() res: Response) {
    const { to } = req.body;
    if (!req.fileName) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'File not found!' });
    }
    try {
      const data = await this.messageService.addVoiceMessage({ file: req.fileName, from: req.user.id, to, text: '' });
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
  @Get('seen/:contactId')
  async seenMessages(@Param('contactId') contactId: string, @Req() req: any) {
    try {
      return await this.messageService.seenMessages({ from: contactId, to: req.user.id });
    } catch (error) {
      throw error;
    }
  }
  @Get(':contactId')
  async getAllMessages(@Param('contactId') contactId: string, @Req() req: any, @Res() res: Response) {
    try {
      const { messages } = await this.messageService.getAllMessages(req.user.id, contactId);
      return res.status(HttpStatus.OK).json({ messages });
    } catch (error) {
      throw error;
    }
  }
}
