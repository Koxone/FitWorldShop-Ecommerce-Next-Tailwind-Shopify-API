'use client';

import { ProductViewProvider } from '@/context/productView/ProductViewContext';

/**
 * Individual product page contexts provider
 * Used only for product detail pages that need size/color selection
 */
export default function ProductDetailProvider({ children }) {
  return (
    <ProductViewProvider>
      {children}
    </ProductViewProvider>
  );
}