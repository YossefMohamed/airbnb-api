import { Router } from "express";
import { protect } from "../../middlewares/auth";
import { postPropertyRouter } from "./addProperty";
import { deletePropertyRouter } from "./deleteProperty";
import { editPropertyRouter } from "./editProperty";
import { getPropertyRouter } from "./getProperty";
import { getPropertiesRouter } from "./getProperties";
import { body, header } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";

const propertyRouter = Router();
propertyRouter.use(getPropertyRouter);
propertyRouter.use(getPropertiesRouter);
propertyRouter.use(protect);
propertyRouter.use(postPropertyRouter);
propertyRouter.use(deletePropertyRouter);
propertyRouter.use(editPropertyRouter);

export { propertyRouter };
