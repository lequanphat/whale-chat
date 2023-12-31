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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messageschema = exports.Messages = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Messages = class Messages extends mongoose_2.Document {
};
exports.Messages = Messages;
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'text' }),
    __metadata("design:type", String)
], Messages.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Messages.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'Users' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Messages.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Messages.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Messages.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Messages.prototype, "doc", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Messages.prototype, "voice", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Messages.prototype, "avatar", void 0);
exports.Messages = Messages = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Messages);
exports.Messageschema = mongoose_1.SchemaFactory.createForClass(Messages);
//# sourceMappingURL=messages.chema.js.map