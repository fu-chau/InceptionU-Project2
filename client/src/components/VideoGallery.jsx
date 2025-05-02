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
      <h4>{video.title || video.filename}</h4>
      {visible ? (
        <video width="100%" controls>
          <source src={`/videos/${video.filename}`} type="video/mp4" />
        </video>
      ) : (
        <div style={{ height: 240, background: '#eee' }}>Loading...</div>
      )}
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