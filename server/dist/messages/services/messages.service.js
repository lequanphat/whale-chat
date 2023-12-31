"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const messages_chema_1 = require("../../schemas/messages.chema");
const config_1 = require("../../config");
let MessagesService = class MessagesService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async getAllMessages(id, contactId) {
        const isValidId = mongoose_2.default.Types.ObjectId.isValid(contactId);
        if (!isValidId) {
            throw new common_1.HttpException('Invalid contact id', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            let messages = await this.messageModel
                .find({
                $or: [
                    { from: id, to: contactId },
                    { from: contactId, to: id },
                ],
            })
                .sort({ createdAt: 1 });
            messages = messages.slice(Math.max(messages.length - 20, 0));
            if (messages.length > 0) {
                for (let i = 1; i < messages.length; i++) {
                    if (messages[i - 1].from.toString() === id) {
                        messages[i].avatar = 'http://localhost:2411/defaults/default_avatar.jpeg';
                    }
                }
                if (messages[0].from.toString() === contactId) {
                    messages[0].avatar = 'http://localhost:2411/defaults/default_avatar.jpeg';
                }
            }
            return { messages };
        }
        catch (error) {
            throw new common_1.HttpException('Can not get messages', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addTextMessage(data) {
        const isValidFrom = mongoose_2.default.Types.ObjectId.isValid(data.from);
        if (!isValidFrom) {
            throw new common_1.HttpException('Invalid From field', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const message = await this.messageModel.create({ from: data.from, to: data.to, text: data.text });
            if (message) {
                return { message };
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addImageMessage({ file, from, to, text }) {
        try {
            const imageMessage = await this.messageModel.create({
                from,
                to,
                type: 'image',
                image: `${config_1.SERVER_URL}/uploads/images/${file}`,
            });
            if (!imageMessage) {
                throw new common_1.HttpException('Error in save message', common_1.HttpStatus.BAD_REQUEST);
            }
            if (text) {
                const textMessage = await this.messageModel.create({ from, to, text });
                if (textMessage) {
                    return { messages: [imageMessage, textMessage], status: true };
                }
            }
            return { message: imageMessage, status: true };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addDocMessage({ file, from, to, text }, originalName) {
        try {
            const docMessage = await this.messageModel.create({
                from,
                to,
                type: 'doc',
                doc: `${config_1.SERVER_URL}/uploads/docs/${file}`,
                text: originalName,
            });
            if (!docMessage) {
                throw new common_1.HttpException('Error in save message', common_1.HttpStatus.BAD_REQUEST);
            }
            if (text) {
                const textMessage = await this.messageModel.create({ from, to, text });
                if (textMessage) {
                    return { messages: [docMessage, textMessage] };
                }
            }
            return { message: docMessage };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addVoiceMessage({ file, from, to }) {
        try {
            const voiceMessage = await this.messageModel.create({
                from,
                to,
                type: 'voice',
                voice: `${config_1.SERVER_URL}/uploads/audios/${file}`,
            });
            if (!voiceMessage) {
                throw new common_1.HttpException('Error in save message', common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: voiceMessage };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(messages_chema_1.Messages.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map