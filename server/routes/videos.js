import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// GET /api/videos/top-liked
router.get('/top-liked', async (req, res) => {
  try {
    const videos = await Video.find().sort({ likes: -1 }).limit(3);
    res.json(videos);
  } catch (err) {
    console.error('Error fetching top liked videos:', err);
    res.status(500).json({ error: 'Failed to fetch top liked videos' });
  }
});

// GET /api/videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error('Error fetching all videos:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

export default router;
