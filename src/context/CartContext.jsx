import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // If the item doesn't have an id, let's use its name as a fallback id since the menu array uses names
    const itemId = item.id || item.name;
    const existing = cart.find(c => (c.id || c.name) === itemId);
    
    // We also need to normalize price from a string like "₹1,800" or "$24" to a number for calculation
    let numericPrice = item.price;
    if (typeof numericPrice === 'string') {
      numericPrice = parseFloat(numericPrice.replace(/[^0-9.-]+/g, ''));
    }

    if (existing) {
      setCart(cart.map(c => (c.id || c.name) === itemId ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, numericPrice, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(c => {
      if ((c.id || c.name) === id) {
        return { ...c, qty: Math.max(0, c.qty + delta) };
      }
      return c;
    }).filter(c => c.qty > 0));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};
