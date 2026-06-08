import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { user, logOut } = useAuth();
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleAuthClick = () => {
    if (user) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStoryClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'story' } });
    } else {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo === 'story') {
      setTimeout(() => {
        document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo serif-heading">IKIGAI</Link>
        
        <div className="navbar-links">
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <a href="#story" onClick={handleStoryClick}>Our Story</a>
          <Link to="/orders">Orders</Link>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn cart-btn" aria-label="Cart" onClick={() => navigate('/orders')}>
            <ShoppingBag size={20} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
          <div className="profile-wrapper" style={{ position: 'relative' }}>
            <button className="icon-btn" aria-label="Profile" onClick={handleAuthClick}>
              {user ? (
                <div className="user-badge gold-text" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {user.email.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={20} />
              )}
            </button>
            {user && isProfileMenuOpen && (
              <div className="profile-dropdown" style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '1rem',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.5rem',
                minWidth: '150px',
                zIndex: 100
              }}>
                <button 
                  onClick={handleLogOut}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.5rem 1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>
          <button className="crimson-btn reserve-btn" onClick={() => navigate('/reservations')}>
            Reserve
          </button>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
