import { AuthService } from '../services/auth.service';
import { UserRegiserDTO } from '../types/register-user.dto';
import { ChangePasswordDTO, EmailDTO, VerifyParamDTO } from '../types';
import { CookieService } from 'src/common/services/cookie.service';
import { Response } from 'express';
import { JwtService } from 'src/common/services/jwt.service';
import { UserLoginDTO } from '../types/login-user.dto';
export declare class AuthController {
    private readonly authSevice;
    private readonly cookieService;
    private readonly jwtService;
    constructor(authSevice: AuthService, cookieService: CookieService, jwtService: JwtService);
    register(data: UserRegiserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyAccount(param: VerifyParamDTO, res: Response): Promise<void>;
    login(data: UserLoginDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(data: EmailDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyChangePassword(data: VerifyParamDTO, res: Response): Promise<void | Response<any, Record<string, any>>>;
    changePassword(data: ChangePasswordDTO): Promise<{
        message: string;
    }>;
}
