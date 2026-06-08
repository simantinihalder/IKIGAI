import React, { useState } from 'react';
import './Reservations.css';

const Reservations = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="reservations-page section-padding container">
      <div className="reservations-header">
        <p className="gold-text">SECURE YOUR EXPERIENCE</p>
        <h1 className="serif-heading reservations-title">Reserve a Table</h1>
        <p className="reservations-desc">
          Join us for an unforgettable evening. Please note that Omakase reservations require 48 hours notice.
        </p>
      </div>

      <div className="reservation-form-container">
        {!submitted ? (
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="gold-text">Date</label>
                <input type="date" id="date" required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="time" className="gold-text">Time</label>
                <input type="time" id="time" required className="form-input" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guests" className="gold-text">Guest Count</label>
                <select id="guests" className="form-input" required>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6+">6+ Guests (Private Dining)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="experience" className="gold-text">Experience</label>
                <select id="experience" className="form-input" required>
                  <option value="dining">Standard Dining</option>
                  <option value="omakase">The Omakase Journey</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes" className="gold-text">Special Dietary Notes (Optional)</label>
              <textarea id="notes" rows="3" className="form-input textarea" placeholder="Allergies, celebrations, or special requests..."></textarea>
            </div>

            <button type="submit" className="crimson-btn submit-btn">Confirm Reservation</button>
          </form>
        ) : (
          <div className="success-message">
            <h2 className="serif-heading">Your Table Awaits</h2>
            <p>Thank you. Your reservation request has been received. We will contact you shortly to confirm the details.</p>
            <button className="outline-btn mt-4" onClick={() => setSubmitted(false)}>Make Another Reservation</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
