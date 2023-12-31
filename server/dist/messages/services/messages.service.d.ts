/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Model } from 'mongoose';
import { Messages } from 'src/schemas/messages.chema';
import { FileUploadDTO, TextMessageDTO } from '../types';
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: Model<Messages>);
    getAllMessages(id: string, contactId: string): Promise<{
        messages: (mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    addTextMessage(data: TextMessageDTO): Promise<{
        message: mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    addImageMessage({ file, from, to, text }: FileUploadDTO): Promise<{
        messages: (mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        })[];
        status: boolean;
        message?: undefined;
    } | {
        message: mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        };
        status: boolean;
        messages?: undefined;
    }>;
    addDocMessage({ file, from, to, text }: FileUploadDTO, originalName: string): Promise<{
        messages: (mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        })[];
        message?: undefined;
    } | {
        message: mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        };
        messages?: undefined;
    }>;
    addVoiceMessage({ file, from, to }: FileUploadDTO): Promise<{
        message: mongoose.Document<unknown, {}, Messages> & Messages & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
}
