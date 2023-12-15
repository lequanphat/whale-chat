import mongoose from 'mongoose';
import Joi from 'joi';
const userSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        avatar: {
            type: String,
            default: '',
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verifyCode: {
            type: String,
        },
        verifyCodeExpiredTime: {
            type: Number,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Users', userSchema);
