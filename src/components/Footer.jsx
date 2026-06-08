import React, { useState } from 'react';
import { Camera, MessageSquare, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setIsSubscribed(true);
  };

  return (
    <footer className="footer-section">
      <div className="newsletter-wrapper">
        <div className="newsletter-card">
          {!isSubscribed ? (
            <>
              <h3 className="serif-heading newsletter-title">Stay Within the Circle</h3>
              <p className="newsletter-desc">
                Join our inner circle for exclusive seasonal previews and private events.
              </p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <div className="input-group">
                  <label htmlFor="email" className="gold-text input-label">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your essence..." 
                    className="newsletter-input" 
                    required 
                  />
                </div>
                <button type="submit" className="crimson-btn join-btn">JOIN</button>
              </form>
            </>
          ) : (
            <div className="newsletter-success">
              <h3 className="serif-heading newsletter-title gold-text">Thank you for subscribing!</h3>
              <p className="newsletter-desc" style={{marginBottom: 0}}>
                You have successfully joined our inner circle. We look forward to sharing our journey with you.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="footer-content container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="serif-heading footer-logo">IKIGAI</h2>
            <p className="brand-desc">
              Crafting experiences that feed the soul in Kolkata. An ode to Japanese tradition through modern Indian eyes.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Instagram"><Camera size={20} /></a>
              <a href="#" aria-label="Twitter"><MessageSquare size={20} /></a>
              <a href="#" aria-label="Facebook"><Globe size={20} /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="gold-text footer-col-title">EXPLORE</h4>
            <Link to="/?scrollTo=story">Our Story</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/info?page=Gift Cards">Gift Cards</Link>
            <Link to="/info?page=Private Events">Private Events</Link>
          </div>

          <div className="footer-links-group">
            <h4 className="gold-text footer-col-title">LEGAL</h4>
            <Link to="/info?page=Privacy Policy">Privacy Policy</Link>
            <Link to="/info?page=Terms of Service">Terms of Service</Link>
            <Link to="/info?page=Press Kit">Press Kit</Link>
            <Link to="/info?page=Careers">Careers</Link>
          </div>

          <div className="footer-visit">
            <h4 className="gold-text footer-col-title">VISIT</h4>
            <address>
              123 Zen Lane, Park Street District<br />
              Kolkata, India<br /><br />
              Tue—Sun: 12:00 PM — 11:00 PM<br />
              Mon: Closed
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 IKIGAI. Crafted with Purpose.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
