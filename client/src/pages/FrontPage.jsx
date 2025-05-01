import Navbar from '../components/Navbar';
import TopLikedVideos from '../components/TopLikedVideos';

const FrontPage = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Video Gallery App</h2>
      <hr />
      <TopLikedVideos />
    </div>
  );
};

export default FrontPage;