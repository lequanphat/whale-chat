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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const users_chema_1 = require("../../schemas/users.chema");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const otp_service_1 = require("../../common/services/otp.service");
const config_1 = require("../../config");
const mail_service_1 = require("../../common/services/mail.service");
const email_format_1 = require("../../common/utils/email.format");
let AuthService = class AuthService {
    constructor(userModel, otpService, emailService) {
        this.userModel = userModel;
        this.otpService = otpService;
        this.emailService = emailService;
    }
    async register(registerUser) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(registerUser.password, salt);
        registerUser.password = hashedPassword;
        const { verifyCode, verifyCodeExpiredTime } = this.otpService.generateOTP();
        const userExists = await this.userModel.findOne({
            email: registerUser.email,
        });
        let user = null;
        if (userExists) {
            if (userExists.verified) {
                throw new common_1.HttpException('Email is already used', common_1.HttpStatus.BAD_REQUEST);
            }
            user = await this.userModel.findOneAndUpdate({ email: registerUser.email }, {
                $set: {
                    password: hashedPassword,
                    verifyCode: verifyCode,
                    verifyCodeExpiredTime: verifyCodeExpiredTime,
                },
            }, { new: true });
        }
        else {
            registerUser.about = `Hello, My name is ${registerUser.displayName}`;
            registerUser.verified = false;
            registerUser.verifyCode = verifyCode;
            registerUser.verifyCodeExpiredTime = verifyCodeExpiredTime;
            registerUser.avatar = `${config_1.SERVER_URL}/defaults/default_avatar.jpeg`;
            user = new this.userModel(registerUser);
            await user.save();
        }
        const { error } = await this.emailService.sendMail({
            email: registerUser.email,
            subject: 'Verify your account',
            html: (0, email_format_1.emailFormat)('Verify your account!', 'this is content', `${config_1.SERVER_URL}/auth/verify-account/${user._id}/${verifyCode}`),
        });
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return { message: 'Send OTP successfully', statusCode: 200 };
    }
    async verifyAccount(param) {
        try {
            const validId = mongoose_1.default.Types.ObjectId.isValid(param.id);
            if (!validId) {
                throw new common_1.HttpException('Invalid Id', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.userModel.findOne({
                _id: param.id,
                verifyCode: param.code,
                verifyCodeExpiredTime: { $gt: Date.now() },
            });
            console.log('user', user);
            if (!user) {
                console.log('here ..... -> ');
                throw new common_1.HttpException('VerifyCode has expired!', common_1.HttpStatus.BAD_REQUEST);
            }
            console.log('verify account');
            const newUser = await this.userModel.findOneAndUpdate({ _id: param.id }, { $set: { verified: true, verifyCode: '', verifyCodeExpiredTime: 0 } }, { new: true });
            return { user: newUser };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async login(data) {
        try {
            const user = await this.userModel
                .findOneAndUpdate({ email: data.email, verified: true }, { status: 'online' }, { new: true })
                .select(['_id', 'displayName', 'email', 'status', 'about', 'avatar', 'password']);
            if (!user) {
                throw new common_1.HttpException('Incorrect email!', 401);
            }
            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException('Incorrect password!', 401);
            }
            console.log(user);
            return { user };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logout(id) {
        try {
            console.log('logout');
            const user = await this.userModel.findByIdAndUpdate({ _id: id }, { status: 'offline' });
            return { user };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async forgotPassword(email) {
        try {
            const { verifyCode, verifyCodeExpiredTime } = this.otpService.generateOTP();
            const user = await this.userModel.findOneAndUpdate({ email }, { $set: { verifyCode, verifyCodeExpiredTime } }, { new: true });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const { error } = await this.emailService.sendMail({
                email,
                subject: 'Verify change password',
                html: (0, email_format_1.emailFormat)('Verify change password!', 'this is content', `${config_1.SERVER_URL}/auth/change-password/${user._id}/${verifyCode}`),
            });
            if (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: 'Send OTP successfully', status: 200 };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyChangePassword(data) {
        const isValidId = mongoose_1.default.Types.ObjectId.isValid(data.id);
        if (!isValidId) {
            throw new common_1.HttpException('Invalid Id', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findOneAndUpdate({ _id: data.id, verifyCode: data.code, verifyCodeExpiredTime: { $gt: Date.now() } }, { $set: { verifyCode: '', verifyCodeExpiredTime: 0 } });
        console.log('user', user);
        if (!user) {
            throw new common_1.HttpException('Verify-code has expired', common_1.HttpStatus.BAD_REQUEST);
        }
        return { id: user._id };
    }
    async changePassword(data, id) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const user = await this.userModel.findByIdAndUpdate({ _id: id }, { $set: { password: hashedPassword } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return { message: 'Change password successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_chema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        otp_service_1.OtpService,
        mail_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map