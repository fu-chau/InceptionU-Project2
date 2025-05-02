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
  const { user, setUser } = useAuth();
  const [likes, setLikes] = useState(video?.likes || 0);
  const [favorites, setFavorites] = useState(video?.favorites || 0);
  const [comments, setComments] = useState(video?.comments || 0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!video?._id || !user) return;
  
    const liked = user.likedVideos?.some(id => id.toString() === video._id.toString());
    const favorited = user.favoriteVideos?.some(id => id.toString() === video._id.toString());
  
    setLiked(liked);
    setFavorited(favorited);
    setLikes(prev => (prev === 0 ? video.likes || 0 : prev));
    setFavorites(video.favorites || 0);
    setComments(video.comments || 0);
    setShowComments(false);
  }, [video?._id, user]);

  const handleReaction = async (type) => {
    const token = localStorage.getItem('token');
    if (!token || !video?.filename) return;
  
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
  
      if (!user) return;
  
      if (type === 'like') {
        const newLikedState = !liked;
            setLiked(newLikedState);
            setLikes(prev => {
                const updated = prev + (newLikedState ? 1 : -1);
                return updated;
              });
  
        const updatedList = user.likedVideos.includes(video._id)
          ? user.likedVideos.filter(id => id !== video._id)
          : [...user.likedVideos, video._id];
  
        const updatedUser = { ...user, likedVideos: updatedList };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
  
      if (type === 'favorite') {
        setFavorited((prev) => !prev);
        setFavorites(data.updated.favorites);
  
        const updatedList = user.favoriteVideos.includes(video._id)
          ? user.favoriteVideos.filter(id => id !== video._id)
          : [...user.favoriteVideos, video._id];
  
        const updatedUser = { ...user, favoriteVideos: updatedList };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
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
