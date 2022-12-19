import { Router } from "express";
import { protect } from "../../middlewares/auth";
import { addToWishListRouter } from "./addToWishList";
import { chageTypeOfItemRouter } from "./changeItemType";
import { deleteFromWishListRouter } from "./deleteFromWishList";
import { getUserWishListRouter } from "./getUserWishList";
const wishListRouter = Router();

wishListRouter.use(protect);
wishListRouter.use(addToWishListRouter);
wishListRouter.use(getUserWishListRouter);
wishListRouter.use(deleteFromWishListRouter);
wishListRouter.use(chageTypeOfItemRouter);

export { wishListRouter };
