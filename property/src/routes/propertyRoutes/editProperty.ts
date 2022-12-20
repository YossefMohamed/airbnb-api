import { Router } from "express";
import { editProperty } from "../../controllers/propertyControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { editPropertyValidators } from "../../services/validators/property/editPropertyValidators";

const router = Router();

router.patch(
  "/:id",
  editPropertyValidators,
  validateRequest,
  clearCache,
  editProperty
);

export { router as editPropertyRouter };
