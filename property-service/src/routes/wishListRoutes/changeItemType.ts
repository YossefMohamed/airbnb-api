import { Router } from "express";
import { chageTypeOfItem } from "../../controllers/wishListControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { changeItemTypeValidators } from "../../services/validators/wishList/chageTypeOfItemValidators";

const router = Router();

router.patch(
  "/:item",
  changeItemTypeValidators,
  validateRequest,
  clearCache,
  chageTypeOfItem
);

export { router as chageTypeOfItemRouter };
