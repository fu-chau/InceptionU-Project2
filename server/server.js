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
//function belowe only for debugging 
app.use((req, res, next) => {
  console.log('➡️  Request:', req.method, req.url);
  next();
});
// app.use(cors({ origin: 'http://localhost:5173' }));
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/reactions', reactionsRoutes);
app.use('/api/comments', commentsRoutes);
// Serve static files *after* the API
app.use(express.static('public'));
app.use('/api/videos', videoRoutes); // <-- Add this
app.use('/api/reactions', reactionsRoutes);
app.use('/api/comments', commentsRoutes);

// Start the server
const startServer = async () => {
  await connectDb();
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
};

startServer();