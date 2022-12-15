import { Router } from "express";
import { editUser } from "../../controllers/userController";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.patch("/", clearCache, editUser);

export { router as editUserRouter };
