import { Router } from "express";
import { chageTypeOfItem } from "../../controllers/wishListControllers";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

router.patch("/:item", clearCache, chageTypeOfItem);

export { router as chageTypeOfItemRouter };
