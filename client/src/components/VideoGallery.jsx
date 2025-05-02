import { useEffect, useState } from 'react';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error('Error fetching videos:', err));
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video._id}>
          <h4>{video.title || video.filename}</h4>
          <video width="480" controls>
            <source src={`/videos/${video.filename}`} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;