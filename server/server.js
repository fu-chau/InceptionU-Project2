import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videos.js';
import reactionsRoutes from './routes/reactionsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';

dotenv.config();
console.log('✅ MONGO_URI:', process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors({ origin: 'http://localhost:5173' }));
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

app.use(express.json());

// Routes
app.use(express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes); // <-- Add this
app.use('/api/reactions', reactionsRoutes);
app.use('/api/comments', commentsRoutes);

// Start the server
const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();