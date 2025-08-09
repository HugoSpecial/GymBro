import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  exercises: [{
    exerciseId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "exercise", 
      required: true 
    },
    sets: [{
      weight: { 
        type: Number, 
        required: true,
        min: 0
      },
      reps: { 
        type: Number, 
        required: true,
        min: 1
      }
    }]
  }]
});

// Aqui garantimos que o model não seja recriado se já existir
const workoutModel = mongoose.models.workout || mongoose.model("workout", workoutSchema);

// Exportação default correta:
export default workoutModel;
