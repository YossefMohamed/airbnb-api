import { Router } from "express";
import { addToWishList } from "../../controllers/wishListControllers";

const router = Router();

router.post("/:id", addToWishList);

export { router as addToWishListRouter };
