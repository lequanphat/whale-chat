import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 10,
        max: 25,
        unique: true,
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
});

export default mongoose.model('Users', userSchema);
