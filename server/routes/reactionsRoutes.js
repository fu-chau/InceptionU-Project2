import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Video from '../models/Video.js';
import User from '../models/User.js';

const router = express.Router();

// POST /api/reactions/toggle
router.post('/toggle', authMiddleware, async (req, res) => {
  const { filename, type } = req.body;
  const userId = req.userId;

  if (!filename || !['like', 'favorite'].includes(type)) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const video = await Video.findOne({ filename });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const field = type === 'like' ? 'likedVideos' : 'favoriteVideos';
    const countField = type === 'like' ? 'likes' : 'favorites';

    const index = user[field].findIndex(vId => vId.toString() === video._id.toString());
    const isActive = index !== -1;

    // Toggle logic
    if (isActive) {
      user[field].splice(index, 1);
      video[countField] = Math.max(0, video[countField] - 1);
    } else {
      user[field].push(video._id);
      video[countField] += 1;
    }

    await user.save();
    await video.save();

    res.json({
      message: `${type} toggled`,
      updated: {
        liked: field === 'likedVideos' && !isActive,
        favorited: field === 'favoriteVideos' && !isActive,
        [countField]: video[countField],
      }
    });
  } catch (err) {
    console.error('Reaction toggle error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
