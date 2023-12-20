import express from 'express';
import multer from 'multer';
import userController from '../controller/usersController.js';
const router = express.Router();

router.get('/get-user', userController.getUser);
router.get('/all-users/:id', userController.getAllUsers);

// edit profile
router.post('/edit-profile/:id', userController.editProfile);

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/uploads/avatars');
    },
    filename: function (req, file, cb) {
        const { id } = req.params;
        if (id) {
            const uniqueSuffix = Date.now() + '-' + id + '-' + file.originalname;
            cb(null, uniqueSuffix);
            req.filePath = uniqueSuffix;
        }
    },
});
// upload images
const fileFilter = (req, file, cb) => {
    // Kiểm tra kích thước của file (20MB)
    if (file.size > 20 * 1024 * 1024) {
        return cb(new Error('File size too large. Max 20MB allowed.'));
    }
    // Cho phép upload file nếu kích thước nhỏ hơn hoặc bằng 20MB
    cb(null, true);
};
const uploadAvatar = multer({ storage: avatarStorage, fileFilter, limits: 20 * 1024 * 1024 });

router.post('/set-avatar/:id', uploadAvatar.single('avatar'), userController.setAvatar);
export default router;
