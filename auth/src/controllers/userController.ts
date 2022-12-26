import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { signIn } from "@property-app/common";
import User, { IUser } from "../models/userModel";

export const signup = async (req: Request, res: Response) => {
  const { name, lastName, email, isAdmin, gender, password } = req.body;

  const user: IUser = await User.create({
    name,
    lastName,
    email,
    isAdmin: isAdmin ? isAdmin : false,
    gender,
    password,
  });

  const token = signIn(user._id, email);
  res.status(201).json({
    status: "ok",
    data: {
      user: {
        _id: user._id,
        name,
        lastName,
        email,
        isAdmin: isAdmin ? isAdmin : false,
        gender,
        token,
      },
    },
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    data: {
      user: req.user,
    },
  });
};

export const editUser = async (req: Request, res: Response) => {
  const name = req.body.name ? req.body.name : req.user.name;
  const lastName = req.body.lastName ? req.body.lastName : req.user.lastName;

  req.user.name = name;
  req.user.lastName = lastName;
  await req.user.save();
  res.status(200).json({
    status: "ok",
    data: req.user,
  });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = signIn(user._id);
    return res.status(200).json({
      status: "ok",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin ? user.isAdmin : false,
          gender: user.name,
          token,
        },
      },
    });
  }
  return res.status(404).json({
    status: "failed",
    message: "Email or password is incorrect",
  });
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.params;
  if (mongoose.Types.ObjectId.isValid(userId)) {
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId)
    ).exec();
    if (user) {
      return res.status(200).json({
        status: "ok",
        data: user,
      });
    }
  }
  next(new NotFoundError("User Not Found"));
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().cache({ key: req.user._id });
  res.status(200).json({
    status: "ok",
    data: users,
  });
};
