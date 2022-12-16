import { Router } from "express";
import { protect } from "../../middlewares/auth";
import { addToWishListRouter } from "./addToWishList";
import { getUserWishListRouter } from "./getUserWishList";
const wishListRouter = Router();

wishListRouter.use(protect);
wishListRouter.use(addToWishListRouter);
wishListRouter.use(getUserWishListRouter);

export { wishListRouter };
