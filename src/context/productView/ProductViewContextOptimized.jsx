'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

const ProductViewContext = createContext();

export function ProductViewProvider({ children }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentColor, setCurrentColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productImages, setProductImages] = useState({});

  // Optimized quantity handlers
  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, 99)); // Limit to 99
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 1)); // Minimum 1
  }, []);

  const updateQuantity = useCallback((newQuantity) => {
    const qty = Math.max(1, Math.min(newQuantity, 99));
    setQuantity(qty);
  }, []);

  // Reset all selections
  const resetSelections = useCallback(() => {
    setQuantity(1);
    setSelectedSize(null);
    setCurrentColor('');
    setIsWishlisted(false);
  }, []);

  // Check if product can be added to cart
  const canAddToCart = useMemo(() => {
    return selectedSize !== null; // Assuming size is required
  }, [selectedSize]);

  // Get current selection summary
  const selectionSummary = useMemo(
    () => ({
      quantity,
      selectedSize,
      currentColor,
      isWishlisted,
      canAddToCart,
    }),
    [quantity, selectedSize, currentColor, isWishlisted, canAddToCart]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      quantity,
      selectedSize,
      currentColor,
      isWishlisted,
      productImages,
      canAddToCart,
      selectionSummary,

      // Setters
      setQuantity,
      setSelectedSize,
      setCurrentColor,
      setIsWishlisted,
      setProductImages,

      // Actions
      incrementQuantity,
      decrementQuantity,
      updateQuantity,
      resetSelections,
    }),
    [
      quantity,
      selectedSize,
      currentColor,
      isWishlisted,
      productImages,
      canAddToCart,
      selectionSummary,
      incrementQuantity,
      decrementQuantity,
      updateQuantity,
      resetSelections,
    ]
  );

  return (
    <ProductViewContext.Provider value={contextValue}>
      {children}
    </ProductViewContext.Provider>
  );
}

export const useProductView = () => {
  const context = useContext(ProductViewContext);
  if (context === undefined) {
    throw new Error('useProductView must be used within a ProductViewProvider');
  }
  return context;
};

// Hooks específicos para reducir re-renders
export const useProductSelection = () => {
  const { selectedSize, setSelectedSize, currentColor, setCurrentColor } =
    useProductView();
  return { selectedSize, setSelectedSize, currentColor, setCurrentColor };
};

export const useProductQuantity = () => {
  const { quantity, incrementQuantity, decrementQuantity, updateQuantity } =
    useProductView();
  return { quantity, incrementQuantity, decrementQuantity, updateQuantity };
};

export const useProductWishlist = () => {
  const { isWishlisted, setIsWishlisted } = useProductView();
  return { isWishlisted, setIsWishlisted };
};

export const useProductImages = () => {
  const { productImages, setProductImages } = useProductView();
  return { productImages, setProductImages };
};
