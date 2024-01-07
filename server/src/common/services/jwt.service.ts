import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ACCESS_SECRET, REFRESH_SECRET, RESET_PASSWORD_SECRET } from 'src/config';
export interface JWTPayload {
  id: string;
  role: string;
}
@Injectable()
export class JwtService {
  // access token
  signAccessToken(payload: JWTPayload, expiryTime = '60m', secret?: string): string {
    const accessTokenSecret = secret || ACCESS_SECRET;
    return jwt.sign(payload, accessTokenSecret, { expiresIn: expiryTime });
  }
  verifyAccessToken(token: string, secret?: string): any {
    const accessTokenSecret = secret || ACCESS_SECRET;
    return jwt.verify(token, accessTokenSecret);
  }

  // refresh token
  verifyRefreshToken(token: string, secret?: string): any {
    const refreshTokenSecret = secret || REFRESH_SECRET;
    return jwt.verify(token, refreshTokenSecret);
  }
  signRefreshToken(payload: JWTPayload, expiryTime = '2d', secret?: string): string {
    const refreshTokenSecret = secret || REFRESH_SECRET;
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: expiryTime });
  }

  // reset password
  signResetPasswordToken(payload: { id: string }, expiryTime = '5m', secret?: string): string {
    const ressetSecret = secret || RESET_PASSWORD_SECRET;
    return jwt.sign(payload, ressetSecret, { expiresIn: expiryTime });
  }
  verifyResetPasswordToken(token: string, secret?: string): any {
    const ressetSecret = secret || RESET_PASSWORD_SECRET;
    return jwt.verify(token, ressetSecret);
  }
}
