import { Router } from "express";
const router = Router();
import { loginPostController, logoutPostController, signupPostController } from "../controller/user.controller";
import { isAuthenticated, isNotAuthenticated } from "../../middleware/checkAuthenticated";

router.post('/signup', isNotAuthenticated, signupPostController);
router.post('/login', isNotAuthenticated, loginPostController);
router.post('/logout', isAuthenticated, logoutPostController);

export default router;