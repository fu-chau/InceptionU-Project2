import { useEffect, useRef, useState } from 'react';
import './VideoGallery.css';

const LazyVideo = ({ video }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="video-card">
      {visible ? (
        <video width="100%" controls>
          <source src={`/videos/${video.filename}`} type="video/mp4" />
        </video>
      ) : (
        <div style={{ height: 240, background: '#eee' }}>Loading...</div>
      )}

      <div className="video-info">
        <p><strong>Camera:</strong> {video.camera?.description || 'Unknown'}</p>
        <p><strong>Location:</strong> {video.camera?.location || 'N/A'}</p>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error('Error fetching videos:', err));
  }, []);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <LazyVideo key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGallery;