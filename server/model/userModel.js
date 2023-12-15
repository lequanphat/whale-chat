import mongoose from 'mongoose';
import Joi from 'joi';
const userSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            validate: {
                validator: async (value) => {
                    return Joi.string().min(10).max(25).validate(value).error === null;
                },
                message: (props) => 'Invalid display name!',
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
            validate: {
                validator: async (value) => {
                    return Joi.string().email().validate(value).error === null;
                },
                message: (props) => 'Invalid email!',
            },
        },
        password: {
            type: String,
            required: true,
            min: 6,
            validate: {
                validator: async (value) => {
                    return Joi.string().min(6).validate(value).error === null;
                },
                message: (props) => 'Invalid password!',
            },
        },
        avatar: {
            type: String,
            default: '',
        },
        verified: {
            type: Boolean,
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
