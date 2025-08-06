import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
});

const exerciseSchema = new mongoose.Schema({
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "exercise", required: true },
  sets: [setSchema],
});

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: Date, default: Date.now },
  exercises: [exerciseSchema],
});

const workoutModel = mongoose.models.workout || mongoose.model("workout", workoutSchema);

export default workoutModel;