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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("../services/messages.service");
const types_1 = require("../types");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let MessagesController = class MessagesController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getAllMessages(contactId, req, res) {
        try {
            const { messages } = await this.messageService.getAllMessages(req.user.id, contactId);
            return res.status(common_1.HttpStatus.OK).json({ messages });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.OK).json({ error: error.message });
        }
    }
    async addTextMessage(data, req, res) {
        data.from = req.user.id;
        try {
            const { message } = await this.messageService.addTextMessage(data);
            return res.status(common_1.HttpStatus.OK).json({ message });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.OK).json({ error: error.message });
        }
    }
    async addImageMessage(req, res) {
        const { to, text } = req.body;
        if (!req.fileName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'File not found!' });
        }
        const data = await this.messageService.addImageMessage({ file: req.fileName, from: req.user.id, to, text });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async addDocMessage(req, res) {
        const { to, text } = req.body;
        if (!req.fileName || !req.originalName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'File not found!' });
        }
        const data = await this.messageService.addDocMessage({ file: req.fileName, from: req.user.id, to, text }, req.originalName);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async addVoiceMessage(req, res) {
        const { to } = req.body;
        if (!req.fileName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'File not found!' });
        }
        const data = await this.messageService.addVoiceMessage({ file: req.fileName, from: req.user.id, to, text: '' });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)(':contactId'),
    __param(0, (0, common_1.Param)('contactId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getAllMessages", null);
__decorate([
    (0, common_1.Post)('add-text-message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.TextMessageDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "addTextMessage", null);
__decorate([
    (0, common_1.Post)('add-image-message'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/images/',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
                req.fileName = `${uniqueSuffix}-${file.originalname}`;
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "addImageMessage", null);
__decorate([
    (0, common_1.Post)('add-doc-message'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('doc', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/docs/',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
                req.fileName = `${uniqueSuffix}-${file.originalname}`;
                req.originalName = file.originalname;
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "addDocMessage", null);
__decorate([
    (0, common_1.Post)('add-voice-message'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/audios/',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
                req.fileName = `${uniqueSuffix}-${file.originalname}`;
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "addVoiceMessage", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map