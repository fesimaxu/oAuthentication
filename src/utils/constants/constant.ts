
export const saltRound = 10
export const OTP_LENGTH = 4
export const OTP_CONFIG = { upperCaseAlphabets: true, specialChars: true }

export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN as unknown as number;
export const TOKEN_SECRET = process.env.JWT_SECRET as unknown as string;