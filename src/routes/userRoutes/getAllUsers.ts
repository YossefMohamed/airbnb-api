import { Router } from "express";
import { getAllUsers } from "../../controllers/userController";

const router = Router();

// get All Users Only For Testing
router.get("/all", getAllUsers);

export { router as getAllUsersRouter };
