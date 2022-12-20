import { Router } from "express";
import { getUserWishList } from "../../controllers/wishListControllers";

const router = Router();

router.get("/", getUserWishList);

export { router as getUserWishListRouter };
