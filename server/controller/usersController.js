import userModel from '../model/userModel.js';
import brcypt from 'bcrypt';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/JWTService.js';
import { saveCookie } from '../utils/CookieService.mjs';
const register = async (req, res, next) => {
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
            token: '',
        });
        const accessToken = signAccessToken({ id: user._doc._id }, '10m');
        const refreshToken = signRefreshToken({ id: user._doc._id }, '20m');
        saveCookie(res, 'access_token', accessToken);
        saveCookie(res, 'refresh_token', refreshToken);
        const updatedUser = await userModel.findOneAndUpdate(
            { username },
            { $set: { token: refreshToken } },
            { new: true },
        );
        const newUser = { ...updatedUser._doc, password: '' };
        console.log(newUser);
        return res.status(200).json({ status: true, user: newUser });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
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
        const accessToken = signAccessToken({ id: user._doc._id }, '10m');
        const refreshToken = signRefreshToken({ id: user._doc._id }, '20m');
        saveCookie(res, 'access_token', accessToken);
        saveCookie(res, 'refresh_token', refreshToken);
        const updatedUser = await userModel.findOneAndUpdate(
            { username },
            { $set: { token: refreshToken } },
            { new: true },
        );
        const newUser = { ...updatedUser._doc, password: '' };
        return res.status(200).json({ user: newUser, status: true });
    } catch (error) {
        next(error);
    }
};

const setAvatarImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { avatar } = req.body;
        if (id === undefined) {
            return res.json({ msg: 'Where is id?', status: false });
        }
        const newUser = await userModel.findOneAndUpdate(
            { _id: id },
            { avatarImage: avatar },
            {
                new: true,
                runValidators: true,
            },
        );
        return res.json({ status: true, user: newUser });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel
            .find({ _id: { $ne: req.params.id } })
            .select(['email', 'username', 'avatarImage', '_id']);
        return res.json(users);
    } catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        const { username } = req.body;
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        await userModel.findOneAndUpdate({ username }, { $set: { token: '' } });
        return res.json({ msg: 'logout' });
    } catch (error) {
        next(error);
    }
};
const refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies['refresh_token'];
    
    try {
        const { err, data } = verifyRefreshToken(refreshToken);
        console.log(data);
        if (err) {
            return next(new Error('Token has expired kkk'));
        }
        const match = await userModel.findOne({ _id: data.id, token: refreshToken });
        console.log(match);
        if (!match) {
            return next(new Error('Unauthorized no match'));
        }
        const accessToken = signAccessToken({ id: data.id }, '30m');
        const newRefreshToken = signRefreshToken({ id: data.id }, '60m');
        const user = await userModel.findOneAndUpdate({ _id: data.id }, { $set: { token: newRefreshToken } }, { new: true });
        saveCookie(res, 'access_token', accessToken);
        saveCookie(res, 'refresh_token', newRefreshToken);
        console.log(user);

        return res.status(200).json({
            user,
        });
    } catch (error) {
        return next(new Error('Unauthorized kkk'));
    }
};
export { register, login, setAvatarImage, getAllUsers, logout, refreshToken };
