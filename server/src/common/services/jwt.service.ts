import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ACCESS_SECRET, REFRESH_SECRET } from 'src/config';

@Injectable()
export class JwtService {
  signAccessToken(payload: any, expiryTime = '2h', secret?: string): string {
    const accessTokenSecret = secret || ACCESS_SECRET;
    return jwt.sign(payload, accessTokenSecret, { expiresIn: expiryTime });
  }

  signRefreshToken(payload: any, expiryTime = '2d', secret?: string): string {
    const refreshTokenSecret = secret || REFRESH_SECRET;
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: expiryTime });
  }

  verifyAccessToken(token: string, secret?: string): any {
    const accessTokenSecret = secret || ACCESS_SECRET;
    return jwt.verify(token, accessTokenSecret);
  }

  verifyRefreshToken(token: string, secret?: string): any {
    const refreshTokenSecret = secret || REFRESH_SECRET;
    return jwt.verify(token, refreshTokenSecret);
  }
}
