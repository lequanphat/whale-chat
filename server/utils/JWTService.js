import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET as ATS, REFRESH_TOKEN_SECRET as RTS } from '../config/index.js';

const signAccessToken = (payload, expiryTime = '10m', secret = ATS) => {
    return jwt.sign(payload, secret, { expiresIn: expiryTime });
};
const signRefreshToken = (payload, expiryTime = '30m', secret = RTS) => {
    return jwt.sign(payload, secret, { expiresIn: expiryTime });
};
const verifyAccessToken = (token, secret = ATS) => {
    let value = null;
    jwt.verify(token, secret, (err, data) => {
        value = { err, data };
    });
    return value;
};
const verifyRefreshToken = (token, secret = RTS) => {
    let value = null;
    jwt.verify(token, secret, (err, data) => {
        value = { err, data };
    });
    return value;
};

export { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
