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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const register_user_dto_1 = require("../types/register-user.dto");
const class_transformer_1 = require("class-transformer");
const types_1 = require("../types");
const cookie_service_1 = require("../../common/services/cookie.service");
const jwt_service_1 = require("../../common/services/jwt.service");
const login_user_dto_1 = require("../types/login-user.dto");
let AuthController = class AuthController {
    constructor(authSevice, cookieService, jwtService) {
        this.authSevice = authSevice;
        this.cookieService = cookieService;
        this.jwtService = jwtService;
    }
    async register(data, res) {
        const userRegister = (0, class_transformer_1.plainToClass)(register_user_dto_1.UserRegiserDTO, data, {
            excludeExtraneousValues: true,
        });
        try {
            await this.authSevice.register(userRegister);
            return res.status(common_1.HttpStatus.OK).json({ message: 'Successfully' });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.OK).json({ error: error.message });
        }
    }
    async verifyAccount(param, res) {
        const { user } = await this.authSevice.verifyAccount(param);
        console.log('controller user', user);
        const accessToken = this.jwtService.signAccessToken({ id: user._id });
        const refreshToken = this.jwtService.signRefreshToken({ id: user._id });
        this.cookieService.saveCookie(res, 'accessToken', accessToken);
        this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
        console.log('redirect');
        res.redirect(`http://localhost:9999/auth/verify-account`);
    }
    async login(data, res) {
        const loginData = (0, class_transformer_1.plainToClass)(login_user_dto_1.UserLoginDTO, data, { excludeExtraneousValues: true });
        try {
            const { user } = await this.authSevice.login(loginData);
            const accessToken = this.jwtService.signAccessToken({ id: user._id });
            const refreshToken = this.jwtService.signRefreshToken({ id: user._id });
            this.cookieService.saveCookie(res, 'accessToken', accessToken);
            this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
            return res.status(200).json({ user });
        }
        catch (error) {
            return res.status(200).json({ error: error.message });
        }
    }
    async logout(req, res) {
        const id = req.user.id;
        await this.authSevice.logout(id);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ msg: 'logout successfully' });
    }
    async refreshToken(req, res) {
        const id = req.user.id;
        const accessToken = this.jwtService.signAccessToken({ id });
        const refreshToken = this.jwtService.signRefreshToken({ id });
        this.cookieService.saveCookie(res, 'accessToken', accessToken);
        this.cookieService.saveCookie(res, 'refreshToken', refreshToken);
        return res.status(200).json({ msg: 'refresh-token successfully' });
    }
    async forgotPassword(data, res) {
        try {
            const value = await this.authSevice.forgotPassword(data.email);
            return res.status(200).json({ message: value.message });
        }
        catch (error) {
            return res.status(400).json({ error: 'User not found' });
        }
        return;
    }
    async verifyChangePassword(data, res) {
        try {
            await this.authSevice.verifyChangePassword(data);
            console.log('data controller here...');
            const resetPasswordToken = this.jwtService.signAccessToken({ id: data.id });
            console.log(resetPasswordToken);
            return res.redirect(`http://localhost:9999/auth/reset-password/${resetPasswordToken}`);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
    async changePassword(data) {
        try {
            const value = this.jwtService.verifyAccessToken(data.token);
            return this.authSevice.changePassword(data, value.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.UserRegiserDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('verify-account/:id/:code'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.VerifyParamDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccount", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.UserLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.EmailDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Get)('/change-password/:id/:code'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.VerifyParamDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyChangePassword", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cookie_service_1.CookieService,
        jwt_service_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map