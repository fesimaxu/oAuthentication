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
    password: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    otpExpire: {
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
        require: true
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
