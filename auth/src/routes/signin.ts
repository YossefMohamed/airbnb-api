import { Router } from "express";
import { signin } from "../../controllers/userController";
import { validateRequest } from "../../middlewares/validate-request";
import { signinValidators } from "../validators/userValidators/user/signinValidators";

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

router.post("/signin", signinValidators, validateRequest, signin);

export { router as signinRouter };
