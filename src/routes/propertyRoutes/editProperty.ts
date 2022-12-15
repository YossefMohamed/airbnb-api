import { Router } from "express";
import { editProperty } from "../../controllers/propertyControllers";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.patch("/:id", clearCache, editProperty);

export { router as editPropertyRouter };
