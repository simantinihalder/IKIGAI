import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Menu.css';

const menuData = {
  "Starters": [
    { 
      name: "Edamame Truffle", 
      desc: "Steamed edamame tossed in white truffle oil and smoked sea salt", 
      price: "₹950",
      image: "/assets/edamame.png",
      type: "Starter",
      ingredients: "Edamame, White Truffle Oil, Smoked Sea Salt",
      flavor: "Earthy, salty, aromatic"
    },
    { 
      name: "Wagyu Gyoza", 
      desc: "Pan-seared dumplings filled with A5 Wagyu and black garlic ponzu", 
      price: "₹1,800",
      image: "/assets/gyoza.png",
      type: "Starter",
      ingredients: "A5 Miyazaki Wagyu, Black Garlic, Ponzu",
      flavor: "Intensely savory, rich, tangy"
    },
    { 
      name: "Yellowtail Jalapeño", 
      desc: "Thinly sliced Hamachi with yuzu soy and sliced serrano peppers", 
      price: "₹2,200",
      image: "/assets/yellowtail.png",
      type: "Starter",
      ingredients: "Hamachi, Yuzu Soy, Serrano Peppers, Cilantro",
      flavor: "Bright, citrusy, spicy, clean"
    }
  ],
  "Omakase Courses": [
    { 
      name: "The Classic Journey", 
      desc: "8 courses of seasonal nigiri and signature dishes", 
      price: "₹9,500",
      image: "/assets/omkase.png",
      type: "Omakase Course",
      ingredients: "Seasonal Whitefish, Bluefin Tuna, Sea Urchin",
      flavor: "Traditional, balanced, ocean-fresh umami"
    },
    { 
      name: "The Premium Experience", 
      desc: "12 courses featuring rare catches from Toyosu Market and A5 Wagyu", 
      price: "₹15,000",
      image: "/assets/uni_gunkan.png",
      type: "Premium Omakase",
      ingredients: "A5 Wagyu, Ossetra Caviar, Bafun Uni",
      flavor: "Decadent, rich, incredibly complex"
    }
  ],
  "Ramen": [
    { 
      name: "Black Garlic Tonkotsu", 
      desc: "Rich 48-hour pork broth, chashu, soft boiled egg, black garlic oil", 
      price: "₹1,800",
      image: "/assets/black_garlic_ramen.png",
      type: "Ramen",
      ingredients: "Chashu Pork, Ajitama, Mayu (Black Garlic Oil)",
      flavor: "Earthy, rich, savory, deeply comforting"
    },
    { 
      name: "Spicy Miso Vegan", 
      desc: "Complex plant-based broth, roasted seasonal mushrooms, chili crisp", 
      price: "₹1,650",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
      type: "Vegan Ramen",
      ingredients: "Mushroom Broth, Roasted Shiitake, House Chili Crisp",
      flavor: "Spicy, umami-rich, warming"
    }
  ],
  "Sake & Drinks": [
    { 
      name: "Dassai 23 Junmai Daiginjo", 
      desc: "Ultra-premium sake, polished to 23%, notes of melon and peach", 
      price: "₹3,500 / glass",
      image: "/assets/dassai23.png",
      type: "Premium Sake",
      ingredients: "Yamada Nishiki Rice, Pure Spring Water",
      flavor: "Floral, fruity, exceptionally smooth"
    },
    { 
      name: "Yuzu Highball", 
      desc: "Japanese whisky, fresh yuzu, sparkling water", 
      price: "₹1,400",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
      type: "Cocktail",
      ingredients: "Japanese Whisky, Yuzu Juice, Carbonated Water",
      flavor: "Citrusy, effervescent, refreshing"
    },
    { 
      name: "Matcha Ceremony", 
      desc: "Traditional whisked ceremonial grade Uji matcha", 
      price: "₹950",
      image: "/assets/matcha_ceremony.png",
      type: "Tea",
      ingredients: "Ceremonial Grade Uji Matcha, Hot Water",
      flavor: "Earthy, slightly bitter, sweet undertones"
    }
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useCart();

  const handleAction = () => {
    if (selectedItem) {
      addToCart(selectedItem);
      setSelectedItem(null); // close the drawer gracefully
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-hero-wrapper">
        <div className="menu-page-header container">
          <p className="gold-text">THE CULINARY GALLERY</p>
          <h1 className="serif-heading menu-page-title">Discover Artisanal Precision</h1>
          <p className="menu-page-desc">A curated journey through the seasons of Japan, served on a plate.</p>
        </div>
      </div>

      <div className="menu-content-wrapper container">
        <div className="menu-navigation">
          {Object.keys(menuData).map(category => (
            <button 
              key={category}
              className={`menu-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-items-grid">
          {menuData[activeCategory].map((item, idx) => (
            <div key={idx} className="menu-item hover-trigger" onClick={() => setSelectedItem(item)}>
              <div className="menu-item-header">
                <h3 className="serif-heading menu-item-name">{item.name}</h3>
                <span className="menu-item-price gold-text">{item.price}</span>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Side Drawer Panel (Left Aligned) */}
      <div className={`menu-drawer-overlay ${selectedItem ? 'active' : ''}`} onClick={() => setSelectedItem(null)}></div>
      
      <div className={`menu-side-drawer ${selectedItem ? 'active' : ''}`}>
        {selectedItem && (
          <div className="menu-drawer-content">
            <button className="menu-drawer-close" onClick={() => setSelectedItem(null)} aria-label="Close details">
              <X size={24} />
            </button>
            
            <div className="menu-drawer-hero">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            
            <div className="menu-drawer-body">
              <h2 className="serif-heading menu-drawer-title">{selectedItem.name}</h2>
              <p className="menu-drawer-story">{selectedItem.desc}</p>
              
              <div className="menu-drawer-facts">
                <div className="menu-fact-item">
                  <span className="menu-fact-label gold-text">Dish Type</span>
                  <span className="menu-fact-value">{selectedItem.type}</span>
                </div>
                <div className="menu-fact-item">
                  <span className="menu-fact-label gold-text">Key Ingredients</span>
                  <span className="menu-fact-value">{selectedItem.ingredients}</span>
                </div>
                <div className="menu-fact-item">
                  <span className="menu-fact-label gold-text">Flavor Notes</span>
                  <span className="menu-fact-value">{selectedItem.flavor}</span>
                </div>
              </div>
            </div>
            
            <div className="menu-drawer-footer">
              <span className="menu-drawer-price">{selectedItem.price}</span>
              <button className="crimson-btn menu-drawer-action-btn" onClick={handleAction}>
                Add to Order
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Menu;
