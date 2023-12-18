import mongoose from 'mongoose';

// type:  text, image, link, doc, timeline

const messageSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'text',
        },
        text: {
            type: String,
            required: true,
            default: '',
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Messages', messageSchema);
