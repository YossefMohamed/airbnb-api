import { Router } from "express";
import { addToWishList } from "../../controllers/wishListControllers";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.post("/:id", clearCache, addToWishList);

export { router as addToWishListRouter };
