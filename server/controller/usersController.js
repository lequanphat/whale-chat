import userModel from '../model/userModel.js';
import { BACKEND_SERVER_PATH } from '../config/index.js';
import { profileSchema } from '../utils/schemaService.js';
const userController = {
    getUser: async (req, res, next) => {
        try {
            const { id } = req.user;
            const token = req.cookies['access_token'];
            const user = await userModel.findById(id);
            const { _id, displayName, email, avatar, about } = user._doc;
            return res.status(200).json({ status: true, user: { id: id, displayName, email, avatar, about, token } });
        } catch (error) {
            return res.status(200).json({ status: false, message: 'Unauthenticated' });
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userModel
                .find({ _id: { $ne: req.params.id } })
                .select(['email', 'displayName', 'about', 'avatar', '_id']);
            return res.status(200).json({ users, status: true });
        } catch (error) {
            return res.status(200).json({ msg: 'Fail in get all users', status: false });
        }
    },
    setAvatar: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(200).json({ msg: 'Can not find user with id ' + id, status: false });
            }
            if (!req.filePath) {
                return res.status(200).json({ msg: 'Please upload an image to set your avatar!', status: false });
            }
            const user = await userModel.findByIdAndUpdate(
                id,
                {
                    avatar: `${BACKEND_SERVER_PATH}/storage/uploads/avatars/${req.filePath}`,
                },
                { new: true },
            );
            if (!user) {
                return res.status(200).json({ msg: 'Can not find user with id ' + id, status: false });
            }
            return res.status(200).json({ avatar: user.avatar, status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    editProfile: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { displayName, about } = req.body;
            if (!displayName) {
                return res.status(200).json({ msg: 'Displayname is required', status: false });
            }
            const { error } = profileSchema.validate({ displayName, about });
            if (error) {
                return res.status(200).json({ msg: error.message, status: false });
            }
            const user = await userModel.findByIdAndUpdate(
                id,
                {
                    displayName,
                    about,
                },
                { new: true },
            );
            if (!user) {
                return res.status(200).json({ msg: 'Can not find user with id ' + id, status: false });
            }
            return res.status(200).json({ displayName: user.displayName, about: user.about, status: true });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
};

export default userController;
