'use client';

import React, { memo } from 'react';
import { ProductViewProvider } from '@/context/productView/ProductViewContextOptimized';
import { BadgeProvider } from '@/context/product-card/BadgeContextOptimized';

// Provider específico para páginas de productos
const ProductProviders = memo(({ children }) => {
  return (
    <ProductViewProvider>
      <BadgeProvider>{children}</BadgeProvider>
    </ProductViewProvider>
  );
});

ProductProviders.displayName = 'ProductProviders';

export default ProductProviders;
