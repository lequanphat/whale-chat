export declare class JwtService {
    signAccessToken(payload: any, expiryTime?: string, secret?: string): string;
    signRefreshToken(payload: any, expiryTime?: string, secret?: string): string;
    verifyAccessToken(token: string, secret?: string): any;
    verifyRefreshToken(token: string, secret?: string): any;
}
