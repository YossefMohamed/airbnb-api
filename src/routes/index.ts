import { Router } from "express";
import { propertyRouter } from "./propertyRoutes";
import { userRouter } from "./userRoutes";

const indexRouter = Router();

indexRouter.use("/property", propertyRouter);
indexRouter.use("/users", userRouter);

export { indexRouter };
