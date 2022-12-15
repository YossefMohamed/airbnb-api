import { Router } from "express";
import { signup } from "../../controllers/userController";
import { clearCache } from "../../middlewares/clearCache";
import { validateRequest } from "../../middlewares/validate-request";
import { signupValidators } from "../../services/validators/user/signupValidators";

const router = Router();

/**
 * @openapi
 * '/api/users/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */

router.post("/signup", clearCache, signupValidators, validateRequest, signup);

export { router as signupRoutes };
