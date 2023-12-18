import express from 'express';
import messagesController from '../controller/messagesController.js';
import multer from 'multer';

// storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/uploads/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        console.log(file);
        cb(null, uniqueSuffix);
        req.fileName = uniqueSuffix;
    },
});

const uploadImage = multer({ storage: storage });
const router = express.Router();
router.post('/add-message', messagesController.addTextMessage);
router.post('/get-all-messages', messagesController.getAllMessages);

// upload router
router.post('/upload-image', uploadImage.single('image'), messagesController.addImageMessage);
export default router;
