import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Badge,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const VideoModal = ({ open, onClose, video }) => {
  if (!video) return null;
  console.log('🧪 Video data in modal:', video);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{video.camera?.location || 'Video'}</DialogTitle>
      <DialogContent>
        <video width="100%" controls autoPlay>
          <source src={`/videos/${video.filename}`} type="video/mp4" />
        </video>

        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Tooltip title="Likes">
            <IconButton>
              <Badge
                badgeContent={video.likes}
                color="secondary"
                max={9999}
              >
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Favorites">
            <IconButton>
              <StarIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Comments">
            <IconButton>
              <Badge
                badgeContent={video.comments}
                color="primary"
                max={9999}
              >
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
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;