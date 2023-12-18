import messageModel from '../model/messageModel.js';

const messagesController = {
    addMessage: async (req, res, next) => {
        try {
            const { from, to, text } = req.body;
            const data = await messageModel.create({ from, to, text });
            if (data) return res.status(200).json({ message: data, status: true });
            return res.status(200).json({ msg: 'Fail to add message to the database!', status: false });
        } catch (error) {
            next(error);
        }
    },
    getAllMessages: async (req, res, next) => {
        try {
            const { userId, contactId } = req.body;
            const messages = await messageModel
                .find({
                    $or: [
                        { from: userId, to: contactId },
                        { from: contactId, to: userId },
                    ],
                })
                .sort({ createdAt: 1 });

            return res.status(200).json({ messages, status: true });
        } catch (error) {
            return res.status(200).json({ msg: 'userId or contactId is invalid', status: false });
        }
    },
};

export default messagesController;
