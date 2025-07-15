'use client';

import { createContext, useContext, useState } from 'react';

const ProductViewContext = createContext();

export function ProductViewProvider({ children }) {
  /* -------- estados que sólo importan dentro del producto abierto -------- */
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentColor, setCurrentColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productImages, setProductImages] = useState({}); 

  return (
    <ProductViewContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductViewContext.Provider>
  );
}

export const useProductView = () => useContext(ProductViewContext);
