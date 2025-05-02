import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import VideoGallery from '../components/VideoGallery';
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';

const GalleryPage = () => {
  const { user } = useAuth();
  const [quadrant, setQuadrant] = useState('');
  const [camera, setCamera] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [cameraOptions, setCameraOptions] = useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((videos) => {
        const uniqueCams = Array.from(new Set(videos.map(v => v.camera?.description))).filter(Boolean);
        setCameraOptions(uniqueCams);
      });
  }, []);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsRegistering(false);
  };

  return (
    <div>
      <Navbar />
      <h2>Welcome to the Video Gallery</h2>
      {user && <p>Logged in as {user.username}</p>}

      <div style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label>Quadrant: </label>
          <select value={quadrant} onChange={(e) => setQuadrant(e.target.value)}>
            <option value="">All</option>
            <option value="NW">NW</option>
            <option value="NE">NE</option>
            <option value="SW">SW</option>
            <option value="SE">SE</option>
          </select>
        </div>

        <div>
          <label>Camera: </label>
          <select value={camera} onChange={(e) => setCamera(e.target.value)}>
            <option value="">All</option>
            {cameraOptions.map((cam) => (
              <option key={cam} value={cam}>{cam}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Location: </label>
          <input
            type="text"
            value={location}
            placeholder="Search by location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label>Sort by: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="likes">Most Liked</option>
            <option value="views">Most Viewed</option>
            <option value="comments">Most Commented</option>
          </select>
        </div>
      </div>

      <VideoGallery
        filters={{ quadrant, camera, location, sort: sortBy }}
        onRequestLogin={() => setShowLoginModal(true)}
      />

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setIsRegistering(false);
              }}
              style={{ float: 'right', border: 'none', background: 'none', fontSize: '1.2rem' }}
            >
              ✖
            </button>

            {isRegistering ? (
              <>
                <Register />
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setIsRegistering(false)} className="nav-link">
                    Log in
                  </button>
                </p>
              </>
            ) : (
              <>
                <Login onSuccess={handleLoginSuccess} />
                <p>
                  Don’t have an account?{' '}
                  <button onClick={() => setIsRegistering(true)} className="nav-link">
                    Register
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GalleryPage;
