import { Router } from "express";
import { deleteFromWishList } from "../../controllers/wishListControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { DeleteFromWishListValidators } from "../../services/validators/wishList/DeleteFromWishListValidators";

const router = Router();

router.delete(
  "/:item",
  DeleteFromWishListValidators,
  validateRequest,
  clearCache,
  deleteFromWishList
);

export { router as deleteFromWishListRouter };
