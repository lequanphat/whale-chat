import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '../services/jwt.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: Response, next: NextFunction) {
    cookieParser()(req, res, () => {
      const token = req.headers.authorization;
      if (!token) {
        throw new HttpException('RFTK', HttpStatus.FORBIDDEN);
      }
      try {
        const data = this.jwtService.verifyAccessToken(token.split(' ')[1]);
        req.user = data;
        console.log(`request with ${data.role} permisstion.`);

        next();
      } catch (error) {
        console.log('Token has expired');
        throw new HttpException('RFTK', HttpStatus.FORBIDDEN);
      }
    });
  }
}
