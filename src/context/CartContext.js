import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, colorName, quantity) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedColor === colorName
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            selectedColor: colorName,
            quantity: quantity,
          },
        ];
      }
    });
  };

  const updateQuantity = (id, selectedColor, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, selectedColor);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedColor === selectedColor
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (id, selectedColor) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.selectedColor === selectedColor))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};