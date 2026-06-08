import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Orders.css';

const orderItems = [
  { id: 1, name: "Tonkotsu Black", desc: "48-hour slow-cooked creamy pork bone broth", price: 1800, image: "/assets/tonkotsu_black.png" },
  { id: 2, name: "Scallop Carpaccio", desc: "Thinly sliced Hokkaido scallops, yuzu vinaigrette, white truffle oil, and microgreens.", price: 2100, image: "/assets/scallop_carpaccio.png" },
  { id: 3, name: "Ocean Jewels", desc: "A hand-selected curation of Otoro tuna and scallops", price: 3800, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Zen Matcha Lava", desc: "Ceremonial grade Uji matcha fondant", price: 1200, image: "/assets/matcha_lava.png" }
];

const Orders = () => {
  const { cart, setCart, addToCart, updateQty } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + ((item.numericPrice || item.price) * item.qty), 0);
  const gratuity = subtotal * 0.15;
  const total = subtotal + gratuity;

  if (isCheckingOut) {
    return (
      <div className="orders-page section-padding container">
        <div className="checkout-success">
          <h2 className="serif-heading">Order Confirmed</h2>
          <p>Your culinary journey is being prepared. Order #IKG-{Math.floor(Math.random() * 10000)}</p>
          <button className="outline-btn mt-4" onClick={() => { setIsCheckingOut(false); setCart([]); }}>Return to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page section-padding container">
      <div className="orders-header">
        <h1 className="serif-heading">The Culinary Gallery</h1>
        <p className="orders-desc">Discover artisanal precision in every plate. Curate your experience for home.</p>
      </div>

      <div className="orders-layout">
        <div className="orders-grid">
          {orderItems.map(item => (
            <div key={item.id} className="order-card">
              <div className="order-img-container">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="order-card-content">
                <div className="order-card-header">
                  <h3 className="serif-heading">{item.name}</h3>
                  <span className="gold-text">₹{item.price.toLocaleString()}</span>
                </div>
                <p className="order-card-desc">{item.desc}</p>
                <button className="outline-btn add-btn" onClick={() => addToCart(item)}>
                  <Plus size={16} style={{marginRight: '8px'}} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="cart-header">
            <h3 className="gold-text">YOUR ORDER</h3>
            <span className="cart-count">{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">₹{(item.numericPrice || item.price).toLocaleString()}</span>
                  </div>
                  <div className="cart-qty-controls">
                    <button onClick={() => updateQty(item.id || item.name, -1)}><Minus size={14}/></button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id || item.name, 1)}><Plus size={14}/></button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="summary-row">
                <span>Gratuity (15%)</span>
                <span>₹{gratuity.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span className="gold-text">₹{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <button className="crimson-btn checkout-btn" onClick={() => setIsCheckingOut(true)}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
