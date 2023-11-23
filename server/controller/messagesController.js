import messageModel from '../model/messageModel.js';

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message,
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({ msg: 'Message added successfully!' });
        return res.json({ msg: 'Fail to add message to the database!' });
    } catch (error) {
        next(error);
    }
};
const getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({updatedAt: 1});
       
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message,
            }
        })
        res.json(projectMessages);

    } catch (error) {
        next(error);
    }
};

export { addMessage, getAllMessages };
