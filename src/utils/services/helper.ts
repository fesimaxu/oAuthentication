import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
import { OTP_CONFIG, OTP_LENGTH, saltRound } from "../constants/constant";

dotenv.config()

export const generateSalt = async () => {

    
    const salt = await bcrypt.genSalt(saltRound)
    return salt;
}


export const hashPassword = async (password:string, salt: string) => {
    const hash = await bcrypt.hash(password, salt);
    return  hash;
}

export const generateOTP = () => {
    const OTP = otpGenerator.generate( OTP_LENGTH ,OTP_CONFIG);
    return OTP;
}