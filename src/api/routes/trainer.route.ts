import { Router } from "express";
const router = Router();
import { isAdmin, isAuthenticated } from "../../middleware/checkAuthenticated";
import { allTrainerGetController, trainerCreatePostController, trainerDeleteController, trainerSearchController, updateTrainerController } from "../controller/trainer.controller";

router.post('/add', isAuthenticated, isAdmin, trainerCreatePostController);
router.get('/all', isAuthenticated, isAdmin, allTrainerGetController);
router.patch('/update/:trainerId', isAuthenticated, isAdmin, updateTrainerController);
router.delete('/delete/:trainerId', isAuthenticated, isAdmin, trainerDeleteController);
router.get('/search/:searchTerm', isAuthenticated, isAdmin, trainerSearchController);

export default router;