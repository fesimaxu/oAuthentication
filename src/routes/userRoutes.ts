import { Router } from "express";
import { requireUser } from "../middleware/error";
import { auth } from "../middleware/auth";
import { getUserDetails } from "../controller/UserController";


const router = Router();



router.use(auth, requireUser);

router.get('/user', getUserDetails);

export default router;