import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { TextMessageDTO } from '../types';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Post('add-image-message')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/images/', // images directory
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
          // next
          req.fileName = `${uniqueSuffix}-${file.originalname}`;
        },
      }),
    }),
  )
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
  @UseInterceptors(
    FileInterceptor('doc', {
      storage: diskStorage({
        destination: './public/uploads/docs/', // docs directory
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
          // next
          req.fileName = `${uniqueSuffix}-${file.originalname}`;
          req.originalName = file.originalname;
        },
      }),
    }),
  )
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
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './public/uploads/audios/', // audios directory
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
          // next
          req.fileName = `${uniqueSuffix}-${file.originalname}`;
        },
      }),
    }),
  )
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
