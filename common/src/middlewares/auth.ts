import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { NotAuthorizedError } from "../errors/not-authorized-error";

import User, { IUser } from "../../../property/src/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

// generate token
export const signIn = (id: Types.ObjectId, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET || "randomSecret", {
    expiresIn: "30d",
  });
};

export const protect = async (req: any, res: Response, next: any) => {
  try {
    let token;
    // 1- get token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(400);
      throw new NotAuthorizedError();
    }

    // 2- validate token
    const login: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "randomSecret"
    );

    req.user = login;
    next();
  } catch (error) {
    next(new NotAuthorizedError());
  }
};
