// import workoutModel from "../models/workoutModel.js";

// class WorkoutController {
//   //   createWorkout = async (req, res) => {
//   //     try {
//   //       console.log("Dados recebidos:", req.body); // Adicione este log
//   //       console.log("Usuário autenticado:", req.user); // Verifique o usuário

//   //       const { exercises } = req.body;

//   //       if (!exercises || !Array.isArray(exercises)) {
//   //         return res.status(400).json({
//   //           success: false,
//   //           message: "Formato inválido de exercícios",
//   //         });
//   //       }

//   //       const newWorkout = await workoutModel.create({
//   //         user: req.user._id,
//   //         exercises,
//   //       });

//   //       console.log("Treino criado:", newWorkout); // Log do resultado

//   //       res.status(201).json({
//   //         success: true,
//   //         workout: newWorkout,
//   //       });
//   //     } catch (error) {
//   //       console.error("Erro detalhado:", error); // Log mais detalhado
//   //       res.status(500).json({
//   //         success: false,
//   //         message: error.message,
//   //       });
//   //     }
//   //   };

//   createWorkout = async (req, res) => {
//     try {
//       console.log("Dados recebidos:", req.body); // Log para depuração

//       const { exercises } = req.body;

//       // Validação adicional no backend
//       if (!exercises || !Array.isArray(exercises)) {
//         return res.status(400).json({
//           success: false,
//           message: "Formato de exercícios inválido",
//         });
//       }

//       // Verificar se todos os exerciseIds são válidos
//       const hasInvalidExercises = exercises.some(
//         (ex) => !ex.exerciseId || typeof ex.exerciseId !== "string"
//       );

//       if (hasInvalidExercises) {
//         return res.status(400).json({
//           success: false,
//           message: "IDs de exercício inválidos",
//         });
//       }

//       const newWorkout = await workoutModel.create({
//         user: req.user._id,
//         exercises: exercises.map((ex) => ({
//           exerciseId: ex.exerciseId,
//           sets: ex.sets,
//         })),
//       });

//       res.status(201).json({
//         success: true,
//         workout: newWorkout,
//       });
//     } catch (error) {
//       console.error("Erro detalhado:", error);
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

//   getUserWorkouts = async (req, res) => {
//     try {
//       // Popula os exercícios para mostrar o nome
//       const workouts = await workoutModel
//         .find({ user: req.user._id })
//         .sort({ date: -1 })
//         .populate("exercises.exerciseId", "name muscleGroup");

//       res.json({ success: true, workouts });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Server error",
//         error: error.message,
//       });
//     }
//   };

//   deleteWorkout = async (req, res) => {
//     try {
//       const { id } = req.params;

//       const workout = await workoutModel.findOneAndDelete({
//         _id: id,
//         user: req.user._id,
//       });

//       if (!workout) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Workout not found" });
//       }

//       res.json({ success: true, message: "Workout deleted" });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Server error",
//         error: error.message,
//       });
//     }
//   };
// }

// export default new WorkoutController();

import workoutModel from "../models/workoutModel.js";

class WorkoutController {
  createWorkout = async (req, res) => {
    try {
      console.log("Dados recebidos:", req.body);

      const { name, exercises } = req.body;

      // Validação dos campos obrigatórios
      if (!name || !exercises || !Array.isArray(exercises)) {
        return res.status(400).json({
          success: false,
          message: "Nome do treino e exercícios são obrigatórios",
        });
      }

      // Verificar se todos os exerciseIds são válidos
      const hasInvalidExercises = exercises.some(
        (ex) => !ex.exerciseId || typeof ex.exerciseId !== "string"
      );

      if (hasInvalidExercises) {
        return res.status(400).json({
          success: false,
          message: "IDs de exercício inválidos",
        });
      }

      const newWorkout = await workoutModel.create({
        user: req.user._id,
        name: name.trim(),
        exercises: exercises.map((ex) => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
        })),
      });

      res.status(201).json({
        success: true,
        workout: newWorkout,
      });
    } catch (error) {
      console.error("Erro detalhado:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//   getUserWorkouts = async (req, res) => {
//     try {
//       // Popula os exercícios para mostrar o nome
//       const workouts = await workoutModel
//         .find({ user: req.user._id })
//         .sort({ date: -1 })
//         .populate("exercises.exerciseId", "name muscleGroup");

//       res.json({ success: true, workouts });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Server error",
//         error: error.message,
//       });
//     }
//   };

getUserWorkouts = async (req, res) => {
    try {
      // Popula os exercícios para mostrar o nome e outras informações
      const workouts = await workoutModel
        .find({ user: req.user._id })
        .sort({ date: -1 })
        .populate({
          path: 'exercises.exerciseId',
          select: 'name muscleGroup description'
        });
  
      // Formata os dados para garantir que o frontend receba corretamente
      const formattedWorkouts = workouts.map(workout => ({
        ...workout.toObject(),
        exercises: workout.exercises.map(exercise => ({
          ...exercise.toObject(),
          exerciseDetails: exercise.exerciseId // Renomeia para ficar mais claro
        }))
      }));
  
      res.json({ success: true, workouts: formattedWorkouts });
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
      res.status(500).json({
        success: false,
        message: "Erro no servidor",
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