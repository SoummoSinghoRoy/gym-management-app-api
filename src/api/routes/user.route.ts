import { Router } from "express";
const router = Router();
import { loginPostController, logoutPostController, signupPostController } from "../controller/user.controller";
import { isAuthenticated } from "../../middleware/checkAuthenticated";

router.post('/signup', signupPostController);
router.post('/login', loginPostController);
router.post('/logout', isAuthenticated, logoutPostController);

export default router;