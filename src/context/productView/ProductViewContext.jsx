'use client';

import { createContext, useContext, useState, useMemo } from 'react';

const ProductViewContext = createContext();

export function ProductViewProvider({ children }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentColor, setCurrentColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productImages, setProductImages] = useState({}); 

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    currentColor,
    setCurrentColor,
    isWishlisted,
    setIsWishlisted,
    productImages,
    setProductImages,
  }), [quantity, selectedSize, currentColor, isWishlisted, productImages]);

  return (
    <ProductViewContext.Provider value={contextValue}>
      {children}
    </ProductViewContext.Provider>
  );
}

export const useProductView = () => useContext(ProductViewContext);
