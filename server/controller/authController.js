import userModel from '../model/userModel.js';
import { saveCookie } from '../utils/CookieService.mjs';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/JWTService.js';
import brcypt from 'bcrypt';

const authController = {
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const usernameCheck = await userModel.findOne({ username });
            if (usernameCheck) {
                return res.status(200).json({ msg: 'Username is already used', status: false });
            }
            const emailCheck = await userModel.findOne({ email });
            if (emailCheck) {
                return res.status(200).json({ msg: 'Email is already used', status: false });
            }
            const hashedPassword = await brcypt.hash(password, 10);

            const user = await userModel.create({
                username,
                email,
                password: hashedPassword,
            });

            const accessToken = signAccessToken({ id: user.id });
            const refreshToken = signRefreshToken({ id: user.id });
            saveCookie(res, 'access_token', accessToken);
            saveCookie(res, 'refresh_token', refreshToken);
            const { password: pw, ...newUser } = user;
            console.log(newUser);
            return res.status(200).json({ status: true, user: newUser });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            // Authentication
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(200).json({ msg: 'Incorrect username', status: false });
            }
            const isPasswordValid = await brcypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(200).json({ msg: 'Incorrect password', status: false });
            }

            // Authorrization
            const accessToken = signAccessToken({ id: user.id });
            const refreshToken = signRefreshToken({ id: user.id });
            saveCookie(res, 'access_token', accessToken);
            saveCookie(res, 'refresh_token', refreshToken);
            const { password: pw, ...newUser } = user._doc;
            console.log(newUser);
            return res.status(200).json({ user: newUser, status: true });
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.json({ msg: 'logout' });
        } catch (error) {
            next(error);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies['refresh_token'];
            const { err, data } = verifyRefreshToken(refreshToken);
            console.log(data);
            if (err) {
                return next(new Error('Refresh token has expired kkk'));
            }
            const user = await userModel.findOne({ _id: data.id });
            if (!user) {
                return next(new Error('Unauthorized no match'));
            }

            const accessToken = signAccessToken({ id: user.id });
            const newRefreshToken = signRefreshToken({ id: user.id });
            saveCookie(res, 'access_token', accessToken);
            saveCookie(res, 'refresh_token', newRefreshToken);

            const { password: pw, ...newUser } = user._doc;
            console.log(newUser);

            return res.status(200).json({
                user: newUser,
            });
        } catch (error) {
            return next(new Error('Unauthorized kkk'));
        }
    },
};

export default authController;
