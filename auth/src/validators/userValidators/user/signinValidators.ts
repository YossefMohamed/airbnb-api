import { body } from "express-validator";

export const signinValidators = [
  body("email").trim().isEmail().withMessage("Please Enter A Valid Email"),
  body("password").exists().withMessage("Password Must Be Between 8 and 20"),
];
