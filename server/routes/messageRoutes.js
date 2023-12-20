import express from 'express';
import messagesController from '../controller/messagesController.js';
import multer from 'multer';

// storage
const imageStorage = multer.diskStorage({
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

const docStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/uploads/docs');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        console.log(file);
        cb(null, uniqueSuffix);
        req.fileName = file.originalname;
        req.filePath = uniqueSuffix;
    },
});
const audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/uploads/audios');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + req.user.id + '-' + file.originalname;
        console.log(file);
        cb(null, uniqueSuffix);
        req.fileName = uniqueSuffix;
    },
});
// upload images
const uploadImage = multer({ storage: imageStorage });
const fileFilter = (req, file, cb) => {
    if (file.size > 20 * 1024 * 1024) {
        return cb(new Error('File size too large. Max 20MB allowed.'));
    }
    cb(null, true);
};
//upload file
const uploadFile = multer({
    storage: docStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});
const uploadAudio = multer({
    storage: audioStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});
const router = express.Router();
router.post('/add-message', messagesController.addTextMessage);
router.post('/get-all-messages', messagesController.getAllMessages);

// upload router
router.post('/upload-image', uploadImage.single('image'), messagesController.addImageMessage);
router.post('/upload-file', uploadFile.single('file'), messagesController.addDocMessage);

router.post('/upload-audio', uploadAudio.single('audio'), messagesController.addVoiceMessage);

// download router
router.get('/download/:filename', messagesController.downLoadFile);
export default router;
