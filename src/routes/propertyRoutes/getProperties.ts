import { Router } from "express";
import { getProperties } from "../../controllers/propertyControllers";

const router = Router();

router.get("/", getProperties);

export { router as getPropertiesRouter };
