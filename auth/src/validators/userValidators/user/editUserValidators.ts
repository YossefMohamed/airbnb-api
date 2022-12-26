import { body } from "express-validator";

export const editUserValidators = [
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last Name Cant Be Empty")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Please Enter A Valid last Name")
    .bail()

    .isString()
    .withMessage("Please Enter A Valid  Last Name")
    .bail(),
  body("name")
    .isString()
    .withMessage("Please Enter A Valid Name ")
    .bail()

    .not()
    .isEmpty()
    .withMessage(" Name Cant Be Empty")
    .bail()
    .isLength({ min: 3, max: 20 })
    .bail()
    .withMessage("Please Enter A Valid  Name"),
];
