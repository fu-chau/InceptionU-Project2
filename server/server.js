import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videos.js';

dotenv.config();
console.log('✅ MONGO_URI:', process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes); // <-- Add this

// Start the server
const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();