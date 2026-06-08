import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content container">
        <h1 className="hero-title serif-heading">IKIGAI</h1>
        <p className="hero-subtitle gold-text">Where Flavor Meets Purpose</p>
        
        <div className="hero-buttons">
          <button className="outline-btn" onClick={() => navigate('/menu')}>Explore Menu</button>
          <button className="crimson-btn" onClick={() => navigate('/reservations')}>Reserve a Table</button>
          <button className="outline-btn" onClick={() => navigate('/orders')}>Order Online</button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
