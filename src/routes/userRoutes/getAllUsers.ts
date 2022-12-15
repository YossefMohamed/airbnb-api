import { Router } from "express";
import { getAllUsers } from "../../controllers/userController";

const router = Router();

/**
 * @openapi
 * '/api/users/all':
 *  get:
 *     tags:
 *     - User
 *     summary: Get all Users For Testing Purpose
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

// get All Users Only For Testing
router.get("/all", getAllUsers);

export { router as getAllUsersRouter };
