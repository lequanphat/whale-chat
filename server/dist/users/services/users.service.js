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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const users_chema_1 = require("../../schemas/users.chema");
const types_1 = require("../types");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserById(id) {
        const validId = mongoose_2.default.Types.ObjectId.isValid(id);
        if (!validId) {
            throw new common_1.HttpException('Invalid Id', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findOne({ _id: id });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return (0, class_transformer_1.plainToClass)(types_1.SerializeUser, user, { excludeExtraneousValues: true });
    }
    async getAllUsers(id) {
        const users = await this.userModel
            .find({ _id: { $ne: id }, verified: true })
            .select(['_id', 'displayName', 'email', 'status', 'about', 'avatar']);
        return users;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_chema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map