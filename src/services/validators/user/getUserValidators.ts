import { param } from "express-validator";
import mongoose from "mongoose";
import { NotFoundError } from "../../../errors/not-found-error";

export const getUserValidators = [
  param("id").custom(async (value, { req }) => {
    console.log("awdwad");

    if (!mongoose.isValidObjectId(value)) throw new NotFoundError();
    return true;
  }),
];
