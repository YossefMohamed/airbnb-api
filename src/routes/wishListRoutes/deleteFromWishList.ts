import { Router } from "express";
import { deleteFromWishList } from "../../controllers/wishListControllers";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.delete("/:item", clearCache, deleteFromWishList);

export { router as deleteFromWishListRouter };
