import { body } from "express-validator";
import User from "../models/userModel";

export const signupValidators = [
  body("email")
    .isEmail()
    .custom(async (value, { req }) => {
      const isDuplicated = (await User.find({ email: value })).length;
      if (isDuplicated) throw new Error(`${value} is duplicated!`);
      return true;
    }),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password Must Be Between 8 and 20"),
  body("gender")
    .toLowerCase()
    .custom((value, { req }) => {
      if (value !== "male" && value !== "female") {
        console.log(value);
        throw new Error("Invalid Gender");
      }
      return true;
    }),
];
