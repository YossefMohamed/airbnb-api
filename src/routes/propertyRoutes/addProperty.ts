import { Router } from "express";
import {
  postProperty,
  postImagesToProperty,
} from "../../controllers/propertyControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { upload } from "../../services/multer";

const router = Router();

router.post("/", clearCache, postProperty);
router.post(
  "/image/:id",
  clearCache,
  upload.array("image", 5),
  postImagesToProperty
);
export { router as postPropertyRouter };
