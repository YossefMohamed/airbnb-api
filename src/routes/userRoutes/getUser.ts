import { Router } from "express";
import { getUser } from "../../controllers/userController";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.get("/:id", clearCache, getUser);

export { router as getUserRouter };
