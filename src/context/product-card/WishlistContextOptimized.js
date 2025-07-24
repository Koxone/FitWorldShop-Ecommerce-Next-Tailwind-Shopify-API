'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoading]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }, []);

  const addToWishlist = useCallback((productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: true,
    }));
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const newWishlist = { ...prev };
      delete newWishlist[productId];
      return newWishlist;
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist({});
  }, []);

  const isWishlisted = useCallback(
    (productId) => !!wishlist[productId],
    [wishlist]
  );

  // Get wishlist statistics
  const wishlistStats = useMemo(() => {
    const productIds = Object.keys(wishlist).filter((id) => wishlist[id]);
    return {
      count: productIds.length,
      productIds,
      isEmpty: productIds.length === 0,
    };
  }, [wishlist]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      wishlist,
      isLoading,
      wishlistStats,

      // Actions
      toggleWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    }),
    [
      wishlist,
      isLoading,
      wishlistStats,
      toggleWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    ]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Hooks específicos para reducir re-renders
export const useWishlistActions = () => {
  const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
    useWishlist();
  return { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist };
};

export const useWishlistStats = () => {
  const { wishlistStats } = useWishlist();
  return wishlistStats;
};

export const useIsWishlisted = (productId) => {
  const { isWishlisted } = useWishlist();
  return useMemo(() => isWishlisted(productId), [isWishlisted, productId]);
};
