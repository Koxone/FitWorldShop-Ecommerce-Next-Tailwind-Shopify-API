'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate cart from localStorage safely on client after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        try {
          setCartItems(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing cart data:', error);
          localStorage.removeItem('cartItems');
        }
      }
    }
  }, []);

  // Sync cart to localStorage on every change
  useEffect(() => {
    if (typeof window !== 'undefined' && cartItems.length >= 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add product to cart - optimized to reduce re-renders
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
  }, []);

  // Update quantity - optimized
  const updateQuantity = useCallback(
    (id, selectedSize, selectedColor, newQuantity) => {
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
    },
    []
  );

  // Remove item from cart - optimized
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

  // Clear cart - optimized
  const clearCart = useCallback(() => setCartItems([]), []);

  // Toggle cart open/close - optimized
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Close cart - optimized
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Open cart - optimized
  const openCart = useCallback(() => setIsCartOpen(true), []);

  // Calculate totals - memoized
  const cartTotals = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      totalItems,
      totalPrice: totalPrice.toFixed(2),
      itemCount: cartItems.length,
    };
  }, [cartItems]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      cartItems,
      isCartOpen,
      cartTotals,

      // Actions
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      toggleCart,
      closeCart,
      openCart,
      setIsCartOpen, // Keep for backward compatibility
      setCartItems, // Keep for backward compatibility
    }),
    [
      cartItems,
      isCartOpen,
      cartTotals,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      toggleCart,
      closeCart,
      openCart,
    ]
  );

  return (
    <PurchaseContext.Provider value={contextValue}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (context === undefined) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
};

// Hooks específicos para evitar re-renders innecesarios
export const useCartItems = () => {
  const { cartItems } = usePurchase();
  return cartItems;
};

export const useCartTotals = () => {
  const { cartTotals } = usePurchase();
  return cartTotals;
};

export const useCartActions = () => {
  const { addToCart, updateQuantity, removeItem, clearCart } = usePurchase();
  return { addToCart, updateQuantity, removeItem, clearCart };
};

export const useCartToggle = () => {
  const { isCartOpen, toggleCart, closeCart, openCart } = usePurchase();
  return { isCartOpen, toggleCart, closeCart, openCart };
};
