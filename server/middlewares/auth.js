import { verifyAccessToken } from '../utils/JWTService.js';

const authenticateToken = (req, res, next) => {
    console.log('client -> ' + req.originalUrl);
    if (
        req.originalUrl === '/api/auth/login' ||
        req.originalUrl === '/api/auth/register' ||
        req.originalUrl.includes('storage')
    ) {
        return next(); // Cho phép tiếp tục nếu là route login hoặc register
    }

    try {
        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];

        if (!refreshToken || !accessToken) {
            return next(new Error('Unauthorized'));
        }
        const { err, data } = verifyAccessToken(accessToken);
        if (err) {
            return next(new Error('Toke has expired'));
        }
        next();
    } catch (error) {
        next(new Error('Toke has expired'));
    }
};
export { authenticateToken };
