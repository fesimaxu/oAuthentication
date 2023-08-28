import { Router } from "express";
import { registerUser, loginUser, logOutUser } from "../controller/UserController";
import { auth } from "../middleware/auth";
import { requireUser } from "../middleware/error";
import { validate } from "../middleware/validateUser";
import { validateUserSignUp, validateUserLogin } from "../utils/validation";



const router = Router();


router.post('/signup', validate(validateUserSignUp), registerUser);
router.post('/signin', validate(validateUserLogin), loginUser);
router.get('/signout', auth, requireUser, logOutUser);



export default router;