import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import VideoModal from './VideoModal';
import './TopLikedVideos.css';

const TopLikedVideos = ({ onRequestLogin }) => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/videos/top-liked')
      .then(res => res.json())
      .then(setVideos)
      .catch(err => console.error('Error loading top liked videos', err));
  }, []);

  const handleVideoClick = (video) => {
    if (!user) {
      onRequestLogin?.(); // same pattern as in Gallery
    } else {
      setSelectedVideo(video);
      setModalOpen(true);
    }
  };

  return (
    <div className="top-liked-container">
      <h3 className="top-liked-title">Top 3 Most Liked Videos</h3>
      <div className="top-liked-grid">
        {videos.map((video) => (
          <div
            key={video._id}
            className="top-liked-card"
            onClick={() => handleVideoClick(video)}
            style={{ cursor: 'pointer' }}
          >
            <video
              controls
              src={`/videos/${video.filename}`}
              poster={video.camera?.url || ''}
            />
            <p><strong>{video.title}</strong></p>
            <p>Likes: {video.likes}</p>
          </div>
        ))}
      </div>

      <VideoModal
        open={modalOpen}
        video={selectedVideo}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default TopLikedVideos;
