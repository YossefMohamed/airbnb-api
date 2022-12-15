import { Router } from "express";
import { editUser } from "../../controllers/userController";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

/**
 * @openapi
 * '/api/users/':
 *  patch:
 *     tags:
 *     - User
 *     summary: Edit Current user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
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

router.patch("/", clearCache, editUser);

export { router as editUserRouter };
