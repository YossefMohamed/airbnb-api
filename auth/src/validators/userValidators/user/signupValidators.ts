import { body } from "express-validator";
import User from "../../../../../property/src/models/userModel";

export const signupValidators = [
  body("email")
    .isEmail()
    .custom(async (value, { req }) => {
      const isDuplicated = (await User.find({ email: value })).length;
      if (isDuplicated) throw new Error(`${value} is duplicated!`);
      return true;
    }),
  body("lastName").not().isEmpty().withMessage("Lastname Cant Be Empty"),
  body("name").not().isEmpty().withMessage("name Cant Be Empty"),
  body("passwordConfirmation")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;

      // If password and confirm password not same
      if (password !== confirmPassword) {
        throw new Error("Passwords must be same");
      }
    })
    .exists()
    .withMessage("Passwords Cant Be Empty"),
];
