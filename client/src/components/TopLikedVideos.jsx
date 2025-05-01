import React, { useEffect, useState } from 'react';

const TopLikedVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos/top-liked')
      .then(res => res.json())
      .then(setVideos)
      .catch(err => console.error('Error loading top liked videos', err));
  }, []);

  return (
    <div>
      <h3>Top 3 Most Liked Videos</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {videos.map((video) => (
          <div key={video._id} style={{ flex: '1 0 30%' }}>
            <video
              width="100%"
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
