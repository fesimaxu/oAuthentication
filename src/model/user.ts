import mongoose from "mongoose";
import { IUSER } from "../utils/constants/interface";




const UserSchema = new mongoose.Schema({

    googleId: {
        type: String,
        require: true
    },
    facebookId: {
        type: String,
        require: true
    },
    displayName: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: false
    },
    role: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
        require: false
    },
    provider: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})






export default mongoose.model<IUSER>('User', UserSchema);
