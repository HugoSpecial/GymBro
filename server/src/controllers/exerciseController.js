import exerciseModel from "../models/exerciseModel.js";

class ExerciseController {
  getExercises = async (req, res) => {
    try {
      const { search } = req.query;
      console.log("Search term received:", search); // Log do termo recebido

      let query = {};
      if (search) {
        query = {
          $text: { $search: search },
        };
        console.log("Query being executed:", query); // Log da query
      }

      const exercises = await exerciseModel
        .find(query)
        .collation({ locale: "pt", strength: 2 })
        .sort({ name: 1 });

      console.log("Exercises found:", exercises.length); // Log dos resultados
      res.json({ success: true, exercises });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  };

  createExercise = async (req, res) => {
    try {
      const { name, muscleGroup, description } = req.body;

      if (!name || !muscleGroup) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Name and muscleGroup are required",
          });
      }

      // Verificar se exercício já existe para evitar duplicados (opcional)
      const existing = await exerciseModel.findOne({ name });
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: "Exercise already exists" });
      }

      const newExercise = await exerciseModel.create({
        name,
        muscleGroup,
        description,
      });

      res
        .status(201)
        .json({
          success: true,
          message: "Exercise created",
          exercise: newExercise,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  };

  createManyExercises = async (req, res) => {
    try {
      const exercises = req.body.exercises; // Espera um array de { name, muscleGroup, description }

      if (!Array.isArray(exercises) || exercises.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Array of exercises is required" });
      }

      // Filtrar exercícios válidos (tem nome e grupo muscular)
      const validExercises = exercises.filter(
        (ex) => ex.name && ex.muscleGroup
      );

      if (validExercises.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No valid exercises to add" });
      }

      // Para evitar duplicados, buscar os que já existem pelo nome
      const existingNames = await exerciseModel
        .find({
          name: { $in: validExercises.map((ex) => ex.name) },
        })
        .distinct("name");

      // Filtrar só os que ainda não existem
      const exercisesToInsert = validExercises.filter(
        (ex) => !existingNames.includes(ex.name)
      );

      if (exercisesToInsert.length === 0) {
        return res
          .status(409)
          .json({ success: false, message: "All exercises already exist" });
      }

      // Inserir os exercícios novos
      const insertedExercises = await exerciseModel.insertMany(
        exercisesToInsert
      );

      res.status(201).json({
        success: true,
        message: `${insertedExercises.length} exercises created`,
        exercises: insertedExercises,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  };
}

export default new ExerciseController();
