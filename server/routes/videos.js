import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

router.get('/top-liked', async (req, res) => {
  try {
    const videos = await Video.find().sort({ likes: -1 }).limit(3);
    res.json(videos);
  } catch (err) {
    console.error('Error fetching top liked videos:', err);
    res.status(500).json({ error: 'Failed to fetch top liked videos' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { quadrant, camera, location, sort } = req.query;
    const filter = {};

    if (quadrant) filter['camera.quadrant'] = quadrant;
    if (camera) filter['camera.description'] = camera;
    if (location) filter['camera.location'] = { $regex: location, $options: 'i' };

    const sortOptions = {
      likes: { likes: -1 },
      views: { views: -1 },
      comments: { comments: -1 },
      newest: { createdAt: -1 },
    };

    const sortBy = sortOptions[sort] || { createdAt: -1 };

    const videos = await Video.find(filter).sort(sortBy);
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

export default router;
