import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
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
      return await this.messageService.seenMessages({ id: req.user.id, from: contactId, to: req.user.id });
    } catch (error) {
      throw error;
    }
  }
  @Get('download/:fileName')
  async downLoadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      return res.download('public/uploads/docs/' + fileName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          return new HttpException(err.message, HttpStatus.BAD_REQUEST);
        } else {
          console.log('File downloaded successfully');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
