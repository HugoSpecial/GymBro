import express from 'express';
import WorkoutController from '../controllers/workoutController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create", authMiddleware, WorkoutController.createWorkout);
router.get("/my-workouts", authMiddleware, WorkoutController.getUserWorkouts);
router.delete("/delete/:id", authMiddleware, WorkoutController.deleteWorkout);

export default router;