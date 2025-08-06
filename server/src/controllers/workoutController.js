import workoutModel from "../models/workoutModel.js";

class WorkoutController {
  createWorkout = async (req, res) => {
    try {
      console.log("Dados recebidos:", req.body); // Adicione este log
      console.log("Usuário autenticado:", req.user); // Verifique o usuário

      const { exercises } = req.body;

      if (!exercises || !Array.isArray(exercises)) {
        return res.status(400).json({
          success: false,
          message: "Formato inválido de exercícios",
        });
      }

      const newWorkout = await workoutModel.create({
        user: req.user._id,
        exercises,
      });

      console.log("Treino criado:", newWorkout); // Log do resultado

      res.status(201).json({
        success: true,
        workout: newWorkout,
      });
    } catch (error) {
      console.error("Erro detalhado:", error); // Log mais detalhado
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getUserWorkouts = async (req, res) => {
    try {
      // Popula os exercícios para mostrar o nome
      const workouts = await workoutModel
        .find({ user: req.user._id })
        .sort({ date: -1 })
        .populate("exercises.exerciseId", "name muscleGroup");

      res.json({ success: true, workouts });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };

  deleteWorkout = async (req, res) => {
    try {
      const { id } = req.params;

      const workout = await workoutModel.findOneAndDelete({
        _id: id,
        user: req.user._id,
      });

      if (!workout) {
        return res
          .status(404)
          .json({ success: false, message: "Workout not found" });
      }

      res.json({ success: true, message: "Workout deleted" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
}

export default new WorkoutController();
