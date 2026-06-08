import React from 'react';
import './Philosophy.css';

const Philosophy = () => {
  return (
    <section className="philosophy-section section-padding container" id="story">
      <div className="philosophy-grid">
        <div className="philosophy-content">
          <p className="gold-text">THE PHILOSOPHY</p>
          <h2 className="serif-heading philosophy-title">
            Simantini Halder's Journey Toward Your Reason for Being
          </h2>
          
          <p className="philosophy-text">
            In the heart of Kolkata, founder Simantini Halder practices the art of Ikigai. Every ingredient is chosen with intention, every cut is made with precision, and every dish is a testament to an Indian artisan's pursuit of Japanese perfection. A bridge between two rich cultures, served on a plate.
          </p>
          
          <div className="philosophy-columns">
            <div className="philosophy-col">
              <h3 className="serif-heading gold-text-heading">Shokunin</h3>
              <p>The craftsman's spirit</p>
            </div>
            <div className="philosophy-col">
              <h3 className="serif-heading gold-text-heading">Kodawari</h3>
              <p>Uncompromising pursuit</p>
            </div>
          </div>
        </div>
        
        <div className="philosophy-image-container">
          <div className="zen-plate-wrapper hover-zoom">
            <img src="/assets/zen_plate.png" alt="Zen stone plate" />
          </div>
          <div className="est-badge serif-heading">
            Est. 2024
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
