import { body } from "express-validator";
import Property from "../../../models/propertyModel";

export const addPropertyValidators = [
  body("name")
    .trim()
    .exists()
    .isLength({ min: 4 })
    .withMessage("Please provid a valid name")
    .custom(async (value, { req }) => {
      const isDuplicated = (await Property.find({ name: value })).length;
      if (isDuplicated)
        throw new Error(`name of the property : ${value} is duplicated!`);
      return true;
    }),
  body("price")
    .isNumeric()
    .isLength({ min: 0 })
    .withMessage("price Must Be A Valid Number"),
  body("width")
    .isNumeric()
    .isLength({ min: 0 })
    .withMessage("price Must Be A Valid Number"),
  body("height")
    .isNumeric()
    .isLength({ min: 0 })
    .withMessage("price Must Be A Valid Number"),
  body("type")
    .exists()
    .isIn(["sell", "rent", "commercial"])
    .withMessage(
      `Type Has To Be One Of : ${["sell", "rent", "commercial"].concat(" ")}`
    ),
  body("geolocation")
    .isObject()
    .withMessage("Whats the name of the property ?")
    .custom(async (value, { req }) => {
      if (!value.type && value.coordinates.length == 2)
        throw new Error("Please Provide A Valid Coordinates !");
      console.log("validation done");

      return true;
    }),
];
