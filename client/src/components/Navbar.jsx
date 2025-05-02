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
  const [menuOpen, setMenuOpen] = useState(false); // 🍔 burger toggle

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsRegistering(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/img/viewsLogo.svg" alt="Views Logo" />
      </div>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/gallery" className="nav-link" onClick={() => setMenuOpen(false)}>Gallery</Link>
        {!user ? (
          <button onClick={() => {
            setShowLoginModal(true);
            setMenuOpen(false);
          }} className="nav-link">
            Login
          </button>
        ) : (
          <button onClick={() => {
            logout();
            setMenuOpen(false);
          }} className="nav-link">Logout</button>
        )}
      </div>

      <div className="burger" onClick={() => setMenuOpen(prev => !prev)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
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
