import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import VideoModal from './VideoModal';
import './VideoGallery.css';

const LazyVideo = ({ video, onClick }) => {
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
    <div ref={ref} className="video-card" onClick={() => onClick(video)} style={{ cursor: 'pointer' }}>
      {visible ? (
        <video width="100%" muted>
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

const VideoGallery = ({ filters, onRequestLogin }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.quadrant) params.append('quadrant', filters.quadrant);
    if (filters.camera) params.append('camera', filters.camera);
    if (filters.location) params.append('location', filters.location);
    if (filters.sort) params.append('sort', filters.sort);

    fetch(`/api/videos?${params.toString()}`)
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error('Error fetching videos:', err));
  }, [filters.quadrant, filters.camera, filters.location, filters.sort]);

  const handleVideoClick = (video) => {
    if (!user) {
      onRequestLogin?.(); // call the login modal trigger from parent
    } else {
      setSelectedVideo(video);
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="video-grid">
        {videos.map((video) => (
          <LazyVideo key={video._id} video={video} onClick={handleVideoClick} />
        ))}
      </div>

      <VideoModal
        open={modalOpen}
        video={selectedVideo}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default VideoGallery;
