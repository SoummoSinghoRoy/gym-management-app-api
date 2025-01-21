import { Router } from "express";
const router = Router();
import { isAdmin, isAuthenticated } from "../../middleware/checkAuthenticated";
import { trainerCreatePostController } from "../controller/trainer.controller";

router.post('/add', isAuthenticated, isAdmin, trainerCreatePostController);
router.get('/all');
router.patch('/update/:trainerId');
router.delete('/delete/:trainerId');

export default router;