import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Badge,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { useAuth } from '../context/AuthContext';
import CommentSection from './CommentSection';
import './VideoModal.css'; // 👈 make sure this is imported

const VideoModal = ({ open, onClose, video }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(video?.likes || 0);
  const [favorites, setFavorites] = useState(video?.favorites || 0);
  const [comments, setComments] = useState(video?.comments || 0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (video) {
      setLikes(video.likes || 0);
      setFavorites(video.favorites || 0);
      setComments(video.comments || 0);
      setLiked(user?.likedVideos?.includes(video._id));
      setFavorited(user?.favoriteVideos?.includes(video._id));
      setShowComments(false);
    }
  }, [video, user]);

  const handleReaction = async (type) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/reactions/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename: video.filename, type }),
      });

      const data = await res.json();

      if (type === 'like') {
        setLiked((prev) => !prev);
        setLikes(data.updated.likes);
      } else if (type === 'favorite') {
        setFavorited((prev) => !prev);
        setFavorites(data.updated.favorites);
      }
    } catch (err) {
      console.error('Error toggling reaction:', err);
    }
  };

  const handleCommentCountChange = (newCount) => {
    setComments(newCount);
  };

  if (!video) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{video.camera?.location || 'Video'}</DialogTitle>
      <DialogContent style={{ position: 'relative' }}>
        <video width="100%" controls autoPlay>
          <source src={`/videos/${video.filename}`} type="video/mp4" />
        </video>

        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Tooltip title="Likes">
            <IconButton onClick={() => handleReaction('like')}>
              <Badge badgeContent={likes} color="secondary" max={9999} showZero>
                <FavoriteIcon style={{ color: liked ? 'red' : 'gray' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Favorites">
            <IconButton onClick={() => handleReaction('favorite')}>
              <StarIcon style={{ color: favorited ? 'gold' : 'gray' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Comments">
            <IconButton onClick={() => setShowComments((prev) => !prev)}>
              <Badge badgeContent={comments} color="primary" max={9999} showZero>
                <CommentIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {showComments && (
          <div className="comment-overlay" onClick={() => setShowComments(false)}>
            <div className="comment-popup" onClick={(e) => e.stopPropagation()}>
              <CommentSection
                videoId={video._id}
                onCommentChange={handleCommentCountChange}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
