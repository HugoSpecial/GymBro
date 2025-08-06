import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true }, // ex: peito, costas, pernas, etc.
  description: { type: String }, // opcional
});

exerciseSchema.index({ name: 'text', muscleGroup: 'text' });

const exerciseModel = mongoose.models.exercise || mongoose.model("exercise", exerciseSchema);

export default exerciseModel;