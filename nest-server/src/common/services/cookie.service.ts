import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class CookieService {
  saveCookie(res: Response, cookieName: string, cookieData: string, time = 3600000, only = true): void {
    res.cookie(cookieName, cookieData, {
      maxAge: time,
      httpOnly: only,
    });
    console.log('Cookie saved');
  }

  getCookie(req: Request, cookieName: string): any {
    return req.cookies[cookieName];
  }
}
