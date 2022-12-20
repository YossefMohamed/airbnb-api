import { Router } from "express";
import { getCurrentUser } from "../../controllers/userController";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Get Current User Data
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Have To Login
 */

router.get("/", clearCache, getCurrentUser);

export { router as getCurrentUserRouter };
