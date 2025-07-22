'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wishlist');
      if (stored) {
        try {
          setWishlist(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
          localStorage.removeItem('wishlist');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(wishlist).length >= 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }, []);

  const isWishlisted = useCallback((productId) => !!wishlist[productId], [wishlist]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    wishlist,
    toggleWishlist,
    isWishlisted
  }), [wishlist, toggleWishlist, isWishlisted]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
