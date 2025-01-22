import { Router } from "express";
const router = Router();
import { isAdmin, isAuthenticated } from "../../middleware/checkAuthenticated";
import { allTrainerGetController, trainerCreatePostController } from "../controller/trainer.controller";

router.post('/add', isAuthenticated, isAdmin, trainerCreatePostController);
router.get('/all', isAuthenticated, isAdmin, allTrainerGetController);
router.patch('/update/:trainerId', isAuthenticated, isAdmin);
router.delete('/delete/:trainerId', isAuthenticated, isAdmin);

export default router;