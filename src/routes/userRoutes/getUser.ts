import { Router } from "express";
import { getUser } from "../../controllers/userController";
import { clearCache } from "../../middlewares/clearCache";

const router = Router();

/**
 * @openapi
 * '/api/users/{id}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get A User Data
 *     parameters:
 *      - name: id
 *        in: path
 *        description: User's ID
 *        required: true
 *        type: string
 *        x-example: 638c4689d6a452e933c6d39a
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Not Found
 *      400:
 *        description: User Not Authorized!
 */

router.get("/:id", clearCache, getUser);

export { router as getUserRouter };
