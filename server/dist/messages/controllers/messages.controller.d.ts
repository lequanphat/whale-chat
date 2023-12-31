import { MessagesService } from '../services/messages.service';
import { TextMessageDTO } from '../types';
import { Response } from 'express';
export declare class MessagesController {
    private readonly messageService;
    constructor(messageService: MessagesService);
    getAllMessages(contactId: string, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    addTextMessage(data: TextMessageDTO, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    addImageMessage(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    addDocMessage(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    addVoiceMessage(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
