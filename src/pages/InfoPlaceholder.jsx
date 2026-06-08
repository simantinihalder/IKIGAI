import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const InfoPlaceholder = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageName = searchParams.get('page') || 'Information';

  return (
    <div className="section-padding container" style={{ paddingTop: '12rem', minHeight: '80vh', textAlign: 'center' }}>
      <p className="gold-text">EXPLORE IKIGAI</p>
      <h1 className="serif-heading" style={{ fontSize: '3.5rem', margin: '1.5rem 0' }}>{pageName}</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
        This is a beautifully designed placeholder for the {pageName} page. The intricate details of our philosophy extend to every facet of our establishment.
      </p>
      <Link to="/" className="outline-btn">Return to Home</Link>
    </div>
  );
};

export default InfoPlaceholder;
