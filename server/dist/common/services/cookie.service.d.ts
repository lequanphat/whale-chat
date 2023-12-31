import { Response, Request } from 'express';
export declare class CookieService {
    saveCookie(res: Response, cookieName: string, cookieData: string, time?: number, only?: boolean): void;
    getCookie(req: Request, cookieName: string): any;
}
