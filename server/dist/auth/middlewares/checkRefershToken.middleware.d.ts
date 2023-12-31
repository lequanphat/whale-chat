import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtService } from '../../common/services/jwt.service';
export declare class CheckRefreshTokenMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: any, res: Response, next: NextFunction): void;
}
