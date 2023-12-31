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
import { UserRegiserDTO } from '../types/register-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.chema';
import { OtpService } from 'src/common/services/otp.service';
import { EmailService } from 'src/common/services/mail.service';
import { UserLoginDTO } from '../types/login-user.dto';
import { ChangePasswordDTO, VerifyParamDTO } from '../types';
export declare class AuthService {
    private userModel;
    private readonly otpService;
    private readonly emailService;
    constructor(userModel: Model<User>, otpService: OtpService, emailService: EmailService);
    register(registerUser: UserRegiserDTO): Promise<{
        message: string;
        statusCode: number;
    }>;
    verifyAccount(param: VerifyParamDTO): Promise<{
        user: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    login(data: UserLoginDTO): Promise<{
        user: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    logout(id: string): Promise<{
        user: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
        status: number;
    }>;
    verifyChangePassword(data: VerifyParamDTO): Promise<{
        id: any;
    }>;
    changePassword(data: ChangePasswordDTO, id: string): Promise<{
        message: string;
    }>;
}
