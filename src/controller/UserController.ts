import { NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../utils/validation";
import User from "../model/user";
import { v4 } from "uuid";
import {
  getGoogleOauthToken,
  getGoogleUser,
} from "../utils/services/session";
import { cookieTimeout, generateSignature, hashPassword, verifyPassword } from "../utils/services/helper";



// To exclude password from details of user details returned

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export const registerUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const { name, email, password, gender } = req.body;

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      displayName: name,
      email,
      gender,
      password: hashedPassword,
      image: "",
      googleId: "",
      facebookId: "",
      dateOfBirth: "",
      verified: true,
      role: "",
      provider: "",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({
      status: "success",
      message: "User registerd successfully",
      data: {
        user: exclude(user, ["password"])
      },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};


export const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    if (user.provider === "Google") {
      return res.status(401).json({
        status: "fail",
        message: `Use ${user.provider} OAuth2 instead`,
      });
    }
    //console.log( "user ",user)
    const validatePassword = await verifyPassword(password, user.password);
    

    if(!validatePassword){
      return res.status(404).json({
        status: "fail",
        message: "Invalid email or password",
      })
    }

    const token = await generateSignature({
      id: user._id,
      email: user.email
    })
   
    res.cookie("token", token, {
      expires: cookieTimeout()
    });

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      
    });
  } catch (err: any) {
    next(err);
  }
};

export const googleOauthHandler = async (req: Request, res: Response) => {
  const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;

  try {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || "/";

    if (!code) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization code not provided!",
      });
    }

    const { id_token, access_token } = await getGoogleOauthToken({ code });

    const { name, verified_email, email, picture } = await getGoogleUser({
      id_token,
      access_token,
    });

    if (!verified_email) {
      return res.status(403).json({
        status: "fail",
        message: "Google account not verified",
      });
    }

    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    const id = v4();

    const newUser = await User.create({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      displayName: name,
      email,
      image: picture,
      gender: "",
      googleId: id,
      facebookId: "",
      dateOfBirth: "",
      password: "",
      role: "",
      verified: true,
      provider: "Google",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    if (!newUser) return res.redirect(`${FRONTEND_ORIGIN}/oauth/error`);


    const token = generateSignature({
      id: newUser._id,
      email: newUser.email,
      verified: newUser.verified
    })

    res.cookie("token", token, {
      expires: cookieTimeout()
    });

    res.redirect(`${FRONTEND_ORIGIN}${pathUrl}`);
  } catch (err: any) {
    console.log("Failed to authorize Google User", err);
    return res.redirect(`${FRONTEND_ORIGIN}/oauth/error`);
  }
};


// to return the authenticated user
export const getUserDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: "success",
      message: "User details",
      data: {
        user
      }
    });
  } catch (err: any) {
    next(err);
  }
};




export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    res.cookie("token", "", { maxAge: -1 });
   return res.status(200).json({ 
      status: "success",
      message: "log out successfully"
    });

  } catch (err: any) {
    next(err);
  }
};
