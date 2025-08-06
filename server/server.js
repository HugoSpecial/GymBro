import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import AuthRoutes from "./src/routes/authRoutes.js";
import UserRoutes from "./src/routes/userRoutes.js";
import WorkoutRoutes from "./src/routes/workoutRoutes.js";
import ExerciseRoutes from "./src/routes/exerciseRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:4000"];

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to GymBro API");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/workout", WorkoutRoutes);
app.use("/api/exercise", ExerciseRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
