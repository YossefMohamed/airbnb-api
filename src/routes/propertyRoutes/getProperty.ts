import { Router } from "express";
import { getProperty } from "../../controllers/propertyControllers";

const router = Router();

router.get("/:id", getProperty);

export { router as getPropertyRouter };
