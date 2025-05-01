import Navbar from '../components/Navbar';
import VideoGallery from '../components/VideoGallery';

const FrontPage = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Video Gallery App</h2>

      <hr />
      <h3>Preview Videos</h3>
      <VideoGallery previewOnly />
    </div>
  );
};

export default FrontPage;