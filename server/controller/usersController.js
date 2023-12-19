import userModel from '../model/userModel.js';
import { BACKEND_SERVER_PATH } from '../config/index.js';
const userController = {
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
    getUser: async (req, res, next) => {
        try {
            const { id } = req.user;
            const token = req.cookies['access_token'];
            const user = await userModel.findById(id);
            const { _id, displayName, email, avatar } = user._doc;
            return res.status(200).json({ status: true, user: { id: id, displayName, email, avatar, token } });
        } catch (error) {
            return res.status(200).json({ status: false, message: 'Unauthenticated' });
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userModel
                .find({ _id: { $ne: req.params.id } })
                .select(['email', 'displayName', 'avatar', '_id']);
            return res.status(200).json({ users, status: true });
        } catch (error) {
            return res.status(200).json({ msg: 'Fail in get all users', status: false });
        }
    },
};

export default userController;
