import React, { useEffect, useState } from 'react';
import './TopLikedVideos.css';

const TopLikedVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos/top-liked')
      .then(res => res.json())
      .then(setVideos)
      .catch(err => console.error('Error loading top liked videos', err));
  }, []);

  return (
    <div className="top-liked-container">
      <h3 className="top-liked-title">Top 3 Most Liked Videos</h3>
      <div className="top-liked-grid">
        {videos.map((video) => (
          <div key={video._id} className="top-liked-card">
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
    </div>
  );
};

export default TopLikedVideos;