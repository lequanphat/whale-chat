import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  signAccessToken(payload: any, expiryTime = '60m', secret?: string): string {
    const accessTokenSecret = secret || '123';
    return jwt.sign(payload, accessTokenSecret, { expiresIn: expiryTime });
  }

  signRefreshToken(payload: any, expiryTime = '1d', secret?: string): string {
    const refreshTokenSecret = secret || '123';
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: expiryTime });
  }

  verifyAccessToken(token: string, secret?: string): any {
    const accessTokenSecret = secret || '321';
    return jwt.verify(token, accessTokenSecret);
  }

  verifyRefreshToken(token: string, secret?: string): any {
    const refreshTokenSecret = secret || '321';
    return jwt.verify(token, refreshTokenSecret);
  }
}
