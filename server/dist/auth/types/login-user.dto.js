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
exports.UserLoginDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UserLoginDTO {
}
exports.UserLoginDTO = UserLoginDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserLoginDTO.prototype, "email", void 0);
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
], UserLoginDTO.prototype, "password", void 0);
//# sourceMappingURL=login-user.dto.js.map