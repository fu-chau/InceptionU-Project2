import os from 'os';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videos.js';
import reactionsRoutes from './routes/reactionsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';

dotenv.config(); // Using resolved .env

console.log('✅ MONGO_URI:', process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
console.log('✅ CORS origin:', allowedOrigin);

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/reactions', reactionsRoutes);
app.use('/api/comments', commentsRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const startServer = async () => {
  await connectDb();
  const ip = getLocalIP();
  app.listen(PORT, HOST, () => {
    console.log(`✅ Server running at http://${ip}:${PORT}`);
  });
};

startServer();
