import { param } from "express-validator";

export const addToWishListValidators = [
  param("item").isMongoId().withMessage("Item Not Found"),
];
