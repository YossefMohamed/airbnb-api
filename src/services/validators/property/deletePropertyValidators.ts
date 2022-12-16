import { param } from "express-validator";
import Property from "../../../models/propertyModel";

export const deletePropertyValidators = [
  param("id").isMongoId().withMessage("Property Not Found"),
];
