'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

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
    if (typeof window !== 'undefined' && cartItems.length >= 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add product to cart - memoized to prevent re-creation
  const addToCart = useCallback((product) => {
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
        return [...prev, { ...product }];
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
  }, []);

  // Update quantity - memoized to prevent re-creation
  const updateQuantity = useCallback((id, selectedSize, selectedColor, newQuantity) => {
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
  }, []);

  // Remove item from cart - memoized to prevent re-creation
  const removeItem = useCallback((id, selectedSize, selectedColor) => {
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
  }, []);

  // Clear cart - memoized to prevent re-creation
  const clearCart = useCallback(() => setCartItems([]), []);

  // Toggle cart open/close - memoized to prevent re-creation  
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    toggleCart,
  }), [cartItems, addToCart, updateQuantity, removeItem, clearCart, isCartOpen, toggleCart]);

  return (
    <PurchaseContext.Provider value={contextValue}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
