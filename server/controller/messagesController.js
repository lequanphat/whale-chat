import { BACKEND_SERVER_PATH } from '../config/index.js';
import messageModel from '../model/messageModel.js';
import userModel from '../model/userModel.js';
const messagesController = {
    addTextMessage: async (req, res, next) => {
        try {
            const { from, to, text } = req.body;
            const data = await messageModel.create({ from, to, text });
            if (data) return res.status(200).json({ message: data, status: true });
            return res.status(200).json({ msg: 'Fail to add message to the database!', status: false });
        } catch (error) {
            next(error);
        }
    },
    addImageMessage: async (req, res, next) => {
        try {
            if (req.fileName) {
                const { from, to, text } = req.body;

                const imageMessage = await messageModel.create({
                    from,
                    to,
                    type: 'image',
                    image: `${BACKEND_SERVER_PATH}/storage/uploads/images/${req.fileName}`,
                });
                if (!imageMessage) {
                    console.log(data);
                    return res.status(200).json({ msg: 'Fail to add image message to database.', status: false });
                }
                if (text) {
                    const textMessage = await messageModel.create({ from, to, text });
                    if (textMessage) {
                        console.log({ messages: [imageMessage, textMessage], status: true });
                        return res.status(200).json({ messages: [imageMessage, textMessage], status: true });
                    }
                }
                return res.status(200).json({ message: imageMessage, status: true });
            }
            return res.status(200).json({ msg: 'There is no image file', status: false });
        } catch (error) {
            next(error);
        }
    },
    addDocMessage: async (req, res, next) => {
        try {
            if (req.fileName) {
                const { from, to, text } = req.body;

                const docMessage = await messageModel.create({
                    from,
                    to,
                    type: 'doc',
                    doc: `${BACKEND_SERVER_PATH}/storage/uploads/docs/${req.filePath}`,
                    text: req.fileName,
                });
                if (!docMessage) {
                    return es.status(200).json({ msg: 'Fail to add doc message to database.', status: false });
                }
                if (text) {
                    const textMessage = await messageModel.create({ from, to, text });
                    if (textMessage) {
                        console.log({ messages: [docMessage, textMessage], status: true });
                        return res.status(200).json({ messages: [docMessage, textMessage], status: true });
                    }
                }
                return res.status(200).json({ message: docMessage, status: true });
            }
            return res.status(200).json({ msg: 'File size too large. Max 20MB allowed.', status: false });
        } catch (error) {
            return res.status(200).json({ msg: error.message, status: false });
        }
    },
    getAllMessages: async (req, res, next) => {
        try {
            const { userId, contactId } = req.body;
            let messages = await messageModel
                .find({
                    $or: [
                        { from: userId, to: contactId },
                        { from: contactId, to: userId },
                    ],
                })
                .sort({ createdAt: 1 });
            // messages = messages.slice(Math.max(messages.length - 20, 0));
            if (messages.length > 0) {
                const contactUser = await userModel.findOne({ _id: contactId });
                for (let i = 1; i < messages.length - 1; i++) {
                    if (messages[i - 1].from.toString() === userId) {
                        messages[i].avatar = contactUser.avatar;
                    }
                }
                if (messages[0].from.toString() === contactId) {
                    messages[0].avatar = contactUser.avatar;
                }
            }
            // console.log(messages);
            return res.status(200).json({ messages, status: true });
        } catch (error) {
            return res.status(200).json({ msg: 'userId or contactId is invalid', status: false });
        }
    },
    downLoadFile: async (req, res, next) => {
        try {
            const { filename } = req.params;
            if (!filename) {
                return res.status(200).json({ msg: 'There is no file', status: false });
            }
            res.download('storage/uploads/docs/' + filename, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                } else {
                    console.log('File downloaded successfully');
                }
            });
        } catch (error) {
            return next(error);
        }
    },
};

export default messagesController;
