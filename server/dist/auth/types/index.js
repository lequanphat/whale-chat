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
exports.EmailDTO = exports.SerializeUser = exports.ChangePasswordDTO = exports.VerifyParamDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class VerifyParamDTO {
}
exports.VerifyParamDTO = VerifyParamDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyParamDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyParamDTO.prototype, "code", void 0);
class ChangePasswordDTO {
}
exports.ChangePasswordDTO = ChangePasswordDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password must have at least 6 characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Password must not exceed 20 characters' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9]{6,20}$/, {
        message: 'Password only contains numbers and characters',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide your password' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "token", void 0);
class SerializeUser {
}
exports.SerializeUser = SerializeUser;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SerializeUser.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SerializeUser.prototype, "displayName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SerializeUser.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SerializeUser.prototype, "avatar", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SerializeUser.prototype, "about", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SerializeUser.prototype, "status", void 0);
class EmailDTO {
}
exports.EmailDTO = EmailDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailDTO.prototype, "email", void 0);
//# sourceMappingURL=index.js.map