import { Router } from "express";
import { googleOauthHandler } from "../controller/UserController";


const router = Router();


/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - firstName
 *         - lastName
 *         - email
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         displayName:
 *           type: string
 *           description: The profile of the user
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         gender:
 *           type: string
 *           description: The user's gender
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         id: d5fE_asz
 *         displayName: uchenna igwe
 *         firstName: uchenna
 *         lastName: igwe
 *         gender: male
 *         createdAt: 2020-03-10T04:05:06.157Z
 */


router.get('/oauth/google', googleOauthHandler);



export default router;