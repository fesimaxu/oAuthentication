import { Router } from "express";
import { googleOauthHandler } from "../controller/UserController";




const router = Router();

router.get('/oauth/google', googleOauthHandler);



export default router;