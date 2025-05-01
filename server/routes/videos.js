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

export default router;