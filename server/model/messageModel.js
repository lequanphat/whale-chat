import mongoose from 'mongoose';

// type:  text, image, link, doc, voice, timeline

const messageSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'text',
        },
        text: {
            type: String,
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
        doc: {
            type: String,
        },
        voice: {
            type: String,
        },
        avatar: {
            type: String, // no data here
        },
    },
    { timestamps: true },
);

export default mongoose.model('Messages', messageSchema);
