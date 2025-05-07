import os from 'os';
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
const HOST = '0.0.0.0';

// app.use(cors({ origin: 'http://localhost:5173' }));
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

// console.log(`✅ CORS enabled for: ${allowedOrigin}`);
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

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
  // app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0 ${PORT}`));
  app.listen(PORT, HOST, () => {
    const ip = getLocalIP();
    console.log(`✅ Server running at http://${ip}:${PORT}`);
  });
};

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


startServer();