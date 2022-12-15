import { body } from "express-validator";
import User from "../../../models/userModel";

export const signinValidators = [
  body("email")
    .trim()
    .isEmail()
    .custom(async (value, { req }) => {
      const isDuplicated = (await User.find({ email: value })).length;
      if (isDuplicated) throw new Error(`${value} is duplicated!`);
      return true;
    }),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password Must Be Between 8 and 20"),
];
