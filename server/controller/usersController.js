import CookieService from '../utils/CookieService.mjs';
import userModel from '../model/userModel.js';
import brcypt from 'bcrypt';

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await userModel.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: 'Username is already used', status: false });
        }
        const emailCheck = await userModel.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: 'Email is already used', status: false });
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });
        const newUser = { ...user._doc, password: '' };

        CookieService.saveCookie(res, 'chat-app-user', JSON.stringify(newUser));
        console.log(newUser);
        return res.json({ status: true, user: newUser });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.json({ msg: 'Incorrect username', status: false });
        }
        const isPasswordValid = await brcypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.json({ msg: 'Incorrect password', status: false });
        }
        const newUser = { ...user._doc, password: '' };

        CookieService.saveCookie(res, 'chat-app-user', JSON.stringify(newUser));
        console.log(newUser);
        return res.json({ status: true, user: newUser });
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
        console.log(newUser);
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
        res.clearCookie('chat-app-user');
        return res.json({msg: 'logout'});
    } catch (error) {
        next(error);
    }
};
export { register, login, setAvatarImage, getAllUsers, logout };
