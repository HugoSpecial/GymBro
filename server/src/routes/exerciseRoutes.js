import express from 'express';
import ExerciseController from '../controllers/exerciseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, ExerciseController.getExercises);
router.post("/", authMiddleware, ExerciseController.createExercise);
router.post("/bulk", authMiddleware, ExerciseController.createManyExercises);

export default router;