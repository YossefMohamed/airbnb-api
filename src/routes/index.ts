import { Router } from "express";
import { propertyRouter } from "./propertyRoutes";
import { userRouter } from "./userRoutes";
import { wishListRouter } from "./wishListRoutes";

const indexRouter = Router();

indexRouter.use("/property", propertyRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/wishlist", wishListRouter);

export { indexRouter };
