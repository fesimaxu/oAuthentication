import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
import { OTP_CONFIG, OTP_LENGTH, TOKEN_EXPIRES_IN, TOKEN_SECRET, saltRound } from "../constants/constant";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config()

export const generateSalt = async () => {

    
    const salt = await bcrypt.genSalt(saltRound)
    return salt;
}


export const hashPassword = async (password:string) => {
    const salt = generateSalt()
    const hash = await bcrypt.hash(password, await salt);
    return  hash;
}

export const generateSignature = async (payload: any) => {
    const value = jwt.sign( payload , `${TOKEN_SECRET}`, {
        expiresIn: `${TOKEN_EXPIRES_IN}m`,
      });

      return value;
}


export const verifySignature= async (signature:string) => {
    return jwt.verify(signature, `${TOKEN_SECRET}`)
    //return jwt.verify(signature, TOKEN_SECRET!)
}

export const cookieTimeout = () => {
    const expiresIn = new Date(Date.now() + TOKEN_EXPIRES_IN * 60 * 1000)
    return expiresIn;
      
}

export const generateOTP = () => {
    const OTP = otpGenerator.generate( OTP_LENGTH ,OTP_CONFIG);
    return OTP;
}

export const verifyPassword = async(enteredPassword:string, savedPassword:string)=>{
    return await bcrypt.compare(enteredPassword, savedPassword)
}