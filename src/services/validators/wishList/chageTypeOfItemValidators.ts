import { body } from "express-validator";

export const changeItemTypeValidators = [
  body("type")
    .exists()
    .withMessage("Please Add The Type")
    .bail()
    .isIn(["saved", "contacted"])
    .withMessage(
      `Type Has To Be One Of : ${["saved", "contacted"].concat(" ")}`
    ),
];
