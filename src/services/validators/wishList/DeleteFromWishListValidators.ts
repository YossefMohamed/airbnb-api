import { param } from "express-validator";

export const DeleteFromWishListValidators = [
  param("item").isMongoId().withMessage("Item Not Found"),
];
