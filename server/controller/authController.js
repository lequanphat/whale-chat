import userModel from '../model/userModel.js';
import { saveCookie } from '../utils/CookieService.mjs';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../utils/JWTService.js';
import brcypt from 'bcrypt';

import { registerSchema } from '../utils/schemaService.js';
import { OtpGenerator } from '../utils/OTPService.js';
import { sendMail } from '../utils/MailService.js';
import { BACKEND_SERVER_PATH } from '../config/index.js';
const authController = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            // check data
            const { value, error } = registerSchema.validate({ email, password });
            if (error) {
                return res.status(200).json({ msg: error.message, status: false });
            }
            // hash pasword and generate verify code
            const salt = await brcypt.genSalt();
            const hashedPassword = await brcypt.hash(password, salt);

            const { verifyCode, verifyCodeExpiredTime } = OtpGenerator();
            console.log({ verifyCode });

            // check user exists
            const emailCheck = await userModel.findOne({ email });
            let user;
            if (emailCheck) {
                if (emailCheck.verified) {
                    return res.status(200).json({ msg: 'Email is already used', status: false });
                }
                user = await userModel.findOneAndUpdate(
                    { email },
                    {
                        $set: {
                            password: hashedPassword,
                            verifyCode: verifyCode,
                            verifyCodeExpiredTime: verifyCodeExpiredTime,
                        },
                    },
                    { new: true },
                );
            } else {
                user = await userModel.create({
                    displayName: email,
                    email,
                    password: hashedPassword,
                    verified: false,
                    verifyCode: verifyCode,
                    verifyCodeExpiredTime: verifyCodeExpiredTime,
                    avatar: `${BACKEND_SERVER_PATH}/storage/default_avatar.jpeg`,
                });
            }

            const { error: er } = sendMail({
                email,
                subject: 'Verify your account',
                text: `Click the link to verify your account: ${BACKEND_SERVER_PATH}/api/auth/verify-account/${user.id}/${verifyCode}`,
            });
            if (er) {
                return res.status(200).json({ msg: 'Error in send mail', status: false });
            }
            return res.status(200).json({ msg: 'Send OTP successfully', status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    verifyAccount: async (req, res, next) => {
        try {
            const { id, code } = req.params;
            const user = await userModel.findOne({
                _id: id,
                verifyCode: code,
                verifyCodeExpiredTime: { $gt: Date.now() },
            });
            if (!user) {
                return res.status(200).json({ msg: 'Verify-Code has expired', status: false });
            }
            const newUser = await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { verified: true, verifyCode: '', verifyCodeExpiredTime: 0 } },
                { new: true },
            );
            return res.status(200).json({ newUser, status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    login: async (req, res, next) => {
        try {
            // Authentication
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user || (user && !user.verified)) {
                return res.status(200).json({ msg: 'Incorrect email', status: false });
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
            // filter data
            const { _id: id, displayName, email: em, avatar } = user._doc;
            return res
                .status(200)
                .json({ user: { id, displayName, email: em, avatar, token: accessToken }, status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    logout: async (req, res, next) => {
        try {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.status(200).json({ msg: 'logout', status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
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
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { verifyCode, verifyCodeExpiredTime } = OtpGenerator();
            const user = await userModel.findOneAndUpdate(
                { email },
                { $set: { verifyCode, verifyCodeExpiredTime } },
                { new: true },
            );
            if (!user) {
                return res.status(200).json({ msg: 'Could not find any accounts with this email.', status: false });
            }

            const { error: er } = sendMail({
                email,
                subject: 'Change password',
                text: `Click the link to change your password: ${BACKEND_SERVER_PATH}/api/auth/change-password/${user.id}/${verifyCode}`,
            });
            if (er) {
                return res.status(200).json({ msg: 'Error in send mail', status: false });
            }
            return res.status(200).json({ msg: 'Send OTP successfully', status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    verifyChangePassword: async (req, res, next) => {
        try {
            const { id, code } = req.params;
            const user = await userModel.findOneAndUpdate(
                {
                    _id: id,
                    verifyCode: code,
                    verifyCodeExpiredTime: { $gt: Date.now() },
                },
                { $set: { verifyCode: '', verifyCodeExpiredTime: 0 } },
            );
            if (!user) {
                return res.status(200).json({ msg: 'Verify-Code has expired', status: false });
            }
            const resetPasswordToken = signAccessToken({ id: user.id });
            saveCookie(res, 'reset_password_token', resetPasswordToken);
            return res.status(200).json({ resetPasswordToken, status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { password } = req.body;
            const reset_password_token = req.cookies['reset_password_token'];
            console.log(req);
            console.log(reset_password_token);
            const { err, data } = verifyAccessToken(reset_password_token);
            if (err) {
                return res.status(200).json({ msg: err.message, status: false });
            }
            console.log(data);
            const salt = await brcypt.genSalt();
            const hashedPassword = await brcypt.hash(password, salt);
            const user = await userModel.findOneAndUpdate(
                { _id: data.id },
                { $set: { password: hashedPassword } },
                { new: true },
            );
            if (!user) {
                return res.status(200).json({ msg: 'Can not find user', status: false });
            }

            return res.status(200).json({ user, status: true }); // redirect login
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
};

export default authController;
