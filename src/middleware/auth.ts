import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { exclude } from "../controller/UserController";
import User from "../model/user";
import { verifySignature } from "../utils/services/helper";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in",
      });
    }

    const decoded: any = verifySignature(token);

    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token or user doesn't exist",
      });
    }

    const user = await User.findOne({ email: decoded.payload.email });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User with that token no longer exist",
      });
    }

    res.locals.user = exclude(user, ["password"]);

    next();
  } catch (err: any) {
    next(err);
  }
};
