'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate cart from localStorage safely on client after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    }
  }, []);

  // Sync cart to localStorage on every change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (existingItem) {
        return prev.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
    // setIsCartOpen(true);

    /* Example usage inside a button onClick:
  onClick={() =>
    addToCart({
      id: product.id,
      title: product.title,
      selectedSize,
      selectedColor,
      quantity: quantity,
      price: product.price,
      image: product.image,
    })
  }
*/
  };

  // Update quantity
  const updateQuantity = (id, selectedSize, selectedColor, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id, selectedSize, selectedColor);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // Remove item from cart
  const removeItem = (id, selectedSize, selectedColor) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Toggle cart open/close
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <PurchaseContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
