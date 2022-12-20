import { Router } from "express";
import { deleteProperty } from "../../controllers/propertyControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { deletePropertyValidators } from "../../services/validators/property/deletePropertyValidators";

const router = Router();

router.delete(
  "/:id",
  deletePropertyValidators,
  validateRequest,
  clearCache,
  deleteProperty
);

export { router as deletePropertyRouter };
