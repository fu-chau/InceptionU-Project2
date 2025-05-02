import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import VideoGallery from '../components/VideoGallery';

const GalleryPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <h2>Welcome to the Video Gallery</h2>
      {user && <p>Logged in as {user.username}</p>}
      <VideoGallery />
    </div>
  );
};

export default GalleryPage;
