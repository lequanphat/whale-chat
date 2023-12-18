import { verifyAccessToken } from '../utils/JWTService.js';

const authenticateToken = (req, res, next) => {
    console.log('client -> ' + req.originalUrl);
    if (
        req.originalUrl === '/api/auth/login' ||
        req.originalUrl === '/api/auth/register' ||
        req.originalUrl === '/api/auth/refresh-token' ||
        req.originalUrl === '/api/auth/forgot-password' ||
        req.originalUrl.includes('/api/auth/verify-account/') ||
        req.originalUrl.includes('/api/auth/change-password') ||
        req.originalUrl.includes('storage')
    ) {
        return next();
    }

    try {
        const accessToken = req.cookies['access_token'];
        if (!accessToken) {
            const error = {
                status: 401,
                message: 'Auth middleware: Unauthorized',
            };
            return next(error);
        }
        const { err, data } = verifyAccessToken(accessToken);
        if (err) {
            const error = {
                status: 403,
                message: 'Auth middleware: Forbiden',
            };
            return next(error);
        }
        req.user = data;
        next();
    } catch (error) {
        return next(error);
    }
};
export { authenticateToken };
