import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const VideoModal = ({ open, onClose, video }) => {
  if (!video) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{video.camera?.location || 'Video'}</DialogTitle>
      <DialogContent>
        <video width="100%" controls autoPlay>
          <source src={`/videos/${video.filename}`} type="video/mp4" />
        </video>

        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <IconButton><FavoriteIcon /></IconButton>
          <IconButton><StarIcon /></IconButton>
          <IconButton><CommentIcon /></IconButton>
          <IconButton><ShareIcon /></IconButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;