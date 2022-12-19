import { Router } from "express";
import { addToWishList } from "../../controllers/wishListControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { addToWishListValidators } from "../../services/validators/wishList/addToWishListValidators";

const router = Router();

router.post(
  "/:id",
  addToWishListValidators,
  validateRequest,
  clearCache,
  addToWishList
);

export { router as addToWishListRouter };
