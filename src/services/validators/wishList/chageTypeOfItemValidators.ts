import { body, param } from "express-validator";

export const changeItemTypeValidators = [
  param("item").isMongoId().withMessage("Item Not Found").bail(),
  body("type")
    .exists()
    .withMessage("Please Add The Type")
    .bail()
    .isIn(["saved", "contacted"])
    .withMessage(
      `Type Has To Be One Of : ${["saved", "contacted"].concat(" ")}`
    ),
];
