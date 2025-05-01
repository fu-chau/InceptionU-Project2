import { useAuth } from '../context/AuthContext';
import VideoGallery from '../components/VideoGallery';
import Navbar from '../components/Navbar';

const GalleryPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <h2>Welcome, {user.username}</h2>
      <VideoGallery />
    </div>
  );
};

export default GalleryPage;