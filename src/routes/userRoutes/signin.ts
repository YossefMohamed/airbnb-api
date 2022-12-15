import { Router } from "express";
import { signin } from "../../controllers/userController";

const router = Router();

/**
 * @openapi
 * '/api/users/signin':
 *  post:
 *     tags:
 *     - User
 *     summary: Signin  a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserSignInInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: Invalid Email Or Password
 */

router.post("/signin", signin);

export { router as signinRouter };
