import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsRegistering(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Tourism <span>Calgary</span>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/gallery" className="nav-link">Gallery</Link>

        {!user ? (
          <button onClick={() => setShowLoginModal(true)} className="nav-link">
            Login
          </button>
        ) : (
          <button onClick={logout} className="nav-link">Logout</button>
        )}
      </div>

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
    </nav>
  );
};

export default Navbar;