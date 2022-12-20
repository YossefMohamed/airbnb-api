import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import WishList from "../models/wishListModel";

export const addToWishList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const property = req.params.id;
  const checkItem = await WishList.find({
    property,
  });
  console.log(checkItem);

  if (checkItem.length) {
    return next(new Error("Property Is Already In Your List"));
  }
  let wishListItem = new WishList({
    property,
    user: req.user._id,
  });
  wishListItem = await wishListItem.save();
  res.status(200).json({
    status: "ok",
    data: wishListItem,
  });
};

export const getUserWishList = async (req: Request, res: Response) => {
  const items = await WishList.find({
    user: req.user._id,
  }).cache({ key: req.user._id });
  res.status(200).json({
    status: "ok",
    data: items,
  });
};

export const deleteFromWishList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { item } = req.params;
  const userItem = await WishList.findOne({ _id: item });
  if (userItem) {
    await userItem.remove();
    res.status(200).json({
      status: "ok",
    });
  } else {
    next(new NotFoundError());
  }
};

export const chageTypeOfItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { item } = req.params;
  const { type } = req.body;
  const userItem = await WishList.findOne({ _id: item });
  if (userItem) {
    userItem.type = type;
    await userItem.save();
    res.status(200).json({
      status: "ok",
      userItem,
    });
  } else {
    next(new NotFoundError());
  }
};
