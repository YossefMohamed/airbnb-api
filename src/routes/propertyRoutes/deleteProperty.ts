import { Router } from "express";
import { deleteProperty } from "../../controllers/propertyControllers";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.delete("/:id", clearCache, deleteProperty);

export { router as deletePropertyRouter };
