import { body } from "express-validator";
import { NotFoundError } from "../../../errors/not-found-error";

export const editUserValidators = [
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password Must Be Between 8 and 20"),
  body("gender")
    .toLowerCase()
    .custom((value, { req }) => {
      if (value !== "male" && value !== "female" && !value) {
        throw new Error("Invalid Gender");
      }
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
    .isEmpty()
    .withMessage("Passwords Cant Be Empty"),
];
