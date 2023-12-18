import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
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
    },
    { timestamps: true },
);

export default mongoose.model('Messages', messageSchema);
