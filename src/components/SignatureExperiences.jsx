import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SignatureExperiences.css';

const experiencesData = {
  omakase: {
    id: 'omakase',
    title: 'The Omakase Journey',
    desc: "A 12-course narrative exploring the season's finest catches from the Toyosu Market.",
    image: '/assets/omkase.png',
    price: '₹15,000',
    story: 'Surrender to the chef. A deeply personal progression of flavors, curated daily based on the most pristine arrivals from global fish markets.',
    facts: [
      { label: 'Style', value: 'Edomae Tradition' },
      { label: 'Key Ingredients', value: 'Bluefin Tuna, Hokkaido Uni, Seasonal Whitefish' },
      { label: 'Flavor Profile', value: 'Delicate, balanced, ocean-fresh umami' }
    ],
    action: 'Reserve Experience'
  },
  uni: {
    id: 'uni',
    title: 'Caviar Uni Gunkan',
    desc: 'Decadent sea urchin topped with premium sturgeon caviar.',
    image: '/assets/uni_gunkan.png',
    price: '₹4,000',
    story: 'The ultimate expression of marine luxury. Sweet, creamy sea urchin meets the briny pop of exceptional caviar, wrapped in crisp nori.',
    facts: [
      { label: 'Style', value: 'Gunkan Maki' },
      { label: 'Key Ingredients', value: 'Bafun Uni, Ossetra Caviar, Gold Leaf' },
      { label: 'Flavor Profile', value: 'Rich, creamy, briny, intensely umami' }
    ],
    action: 'Add to Order'
  },
  ramen: {
    id: 'ramen',
    title: 'Black Garlic Ramen',
    desc: 'Rich, complex, soul-warming',
    image: '/assets/black_garlic_ramen.png',
    price: '₹1,800',
    story: 'Our signature 48-hour tonkotsu broth, elevated with roasted black garlic oil. A deep, robust bowl that warms the soul and lingers on the palate.',
    facts: [
      { label: 'Style', value: 'Tonkotsu' },
      { label: 'Key Ingredients', value: 'Chashu Pork, Ajitama, Mayu (Black Garlic Oil)' },
      { label: 'Flavor Profile', value: 'Earthy, rich, savory, deeply comforting' }
    ],
    action: 'Add to Order'
  }
};

const SignatureExperiences = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleAction = () => {
    if (selectedItem?.action === 'Reserve Experience') {
      navigate('/reservations');
    } else {
      navigate('/orders');
    }
  };

  return (
    <section className="menu-section section-padding container" id="menu">
      <div className="menu-header">
        <div>
          <p className="gold-text">CURATED SELECTION</p>
          <h2 className="serif-heading menu-title">Signature Experiences</h2>
        </div>
        <a href="#full-menu" className="menu-link" onClick={(e) => { e.preventDefault(); navigate('/menu'); }}>View Full Menu &rarr;</a>
      </div>

      <div className="menu-grid">
        <div className="menu-card tall-card hover-lift" onClick={() => setSelectedItem(experiencesData.omakase)}>
          <div className="card-image-placeholder"></div>
          <div className="card-content">
            <h3 className="serif-heading card-title">{experiencesData.omakase.title}</h3>
            <p className="card-desc">{experiencesData.omakase.desc}</p>
            <p className="card-price gold-text">₹15,000 per guest</p>
          </div>
        </div>

        <div className="menu-column">
          <div className="menu-card row-card hover-lift" onClick={() => setSelectedItem(experiencesData.uni)}>
            <div className="card-image hover-zoom">
              <img src={experiencesData.uni.image} alt={experiencesData.uni.title} />
            </div>
            <div className="card-content absolute-content">
              <h3 className="serif-heading card-title">{experiencesData.uni.title}</h3>
              <p className="card-desc">{experiencesData.uni.desc}</p>
            </div>
          </div>

          <div className="menu-card row-card hover-lift" onClick={() => setSelectedItem(experiencesData.ramen)}>
            <div className="card-image hover-zoom">
              <img src={experiencesData.ramen.image} alt={experiencesData.ramen.title} />
            </div>
            <div className="card-content absolute-content">
              <h3 className="serif-heading card-title">{experiencesData.ramen.title}</h3>
              <p className="card-desc">{experiencesData.ramen.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Drawer Panel */}
      <div className={`drawer-overlay ${selectedItem ? 'active' : ''}`} onClick={() => setSelectedItem(null)}></div>
      
      <div className={`side-drawer ${selectedItem ? 'active' : ''}`}>
        {selectedItem && (
          <div className="drawer-content">
            <button className="drawer-close" onClick={() => setSelectedItem(null)} aria-label="Close details">
              <X size={24} />
            </button>
            
            <div className="drawer-hero">
              <img src={selectedItem.image} alt={selectedItem.title} />
            </div>
            
            <div className="drawer-body">
              <h2 className="serif-heading drawer-title">{selectedItem.title}</h2>
              <p className="drawer-story">{selectedItem.story}</p>
              
              <div className="drawer-facts">
                {selectedItem.facts.map((fact, idx) => (
                  <div className="fact-item" key={idx}>
                    <span className="fact-label gold-text">{fact.label}</span>
                    <span className="fact-value">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="drawer-footer">
              <span className="drawer-price">{selectedItem.price}</span>
              <button className="crimson-btn drawer-action-btn" onClick={handleAction}>
                {selectedItem.action}
              </button>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default SignatureExperiences;
