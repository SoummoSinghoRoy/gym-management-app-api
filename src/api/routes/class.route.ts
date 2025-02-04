import { Router } from "express";
const router = Router();
import { isAuthenticated, isAdmin } from "../../middleware/checkAuthenticated";
import { allClassGetController, classCreatePostController } from "../controller/class.controller";

router.post('/add', isAuthenticated, isAdmin, classCreatePostController);
router.get('/all', isAuthenticated, allClassGetController);

export default router;