import { NextFunction, Request, Response } from "express";
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
  if (checkItem) {
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
  });
  res.status(200).json({
    status: "ok",
    data: items,
  });
};
