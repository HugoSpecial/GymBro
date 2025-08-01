import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import AuthRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:4000'];

connectDB();

app.use(express.json());
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to GymBro API');
});

app.use('/api/auth', AuthRoutes);


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

