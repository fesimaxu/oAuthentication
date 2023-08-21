export interface IUSER {
    googleId: string;
    facebookId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    password: string;
    salt: string;
    otp: number;
    otpExpire: string;
    gender: string;
    dateOfBirth: string;
    role: string;
    image: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface GoogleOauthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
  }


export interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    profile: string;
    locale: string;
}