import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
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
        min:8,
        max: 50,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String, 
        default: "",
    }
})

export default mongoose.model("Users", userSchema);