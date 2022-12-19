import { Router } from "express";
import {
  postProperty,
  postImagesToProperty,
} from "../../controllers/propertyControllers";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { upload } from "../../services/multer";
import { addPropertyValidators } from "../../services/validators/property/addPropertyValidators";

const router = Router();

/**
 * @openapi
 * '/api/property':
 *  post:
 *     tags:
 *     - Property
 *     summary: Add A property
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateProperty'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

router.post(
  "/",
  addPropertyValidators,
  validateRequest,
  clearCache,
  postProperty
);

/**
 * @openapi
 * '/api/property/image/{id}':
 *  post:
 *     tags:
 *     - Property
 *     summary:  Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: image
 *        type: file
 *        required: true
 *        description: The file to upload.
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */

router.post(
  "/image/:id",
  clearCache,
  upload.array("image", 5),
  postImagesToProperty
);
export { router as postPropertyRouter };
