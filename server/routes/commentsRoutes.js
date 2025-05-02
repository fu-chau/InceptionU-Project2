import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/comments/:videoId → Fetch comments for a video
router.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Failed to load comments' });
  }
});

// POST /api/comments/ → Add comment
router.post('/', authMiddleware, async (req, res) => {
  const { videoId, text } = req.body;
  const userId = req.userId;

  if (!videoId || !text) return res.status(400).json({ message: 'Missing fields' });

  try {
    const user = await User.findById(userId);
    const newComment = await Comment.create({
      videoId,
      userId,
      username: user.username,
      text
    });

    await Video.findByIdAndUpdate(videoId, { $inc: { comments: 1 } });

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// DELETE /api/comments/:commentId → Delete comment
router.delete('/:commentId', authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();
    await Video.findByIdAndUpdate(comment.videoId, { $inc: { comments: -1 } });

    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

export default router;
