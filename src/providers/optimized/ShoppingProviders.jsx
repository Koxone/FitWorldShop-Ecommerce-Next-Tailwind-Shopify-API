'use client';

import React, { memo } from 'react';
import { PurchaseProvider } from '@/context/Cart/PurchaseContextOptimized';
import { WishlistProvider } from '@/context/product-card/WishlistContextOptimized';

// Provider para funcionalidades del carrito y wishlist
const ShoppingProviders = memo(({ children }) => {
  return (
    <PurchaseProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </PurchaseProvider>
  );
});

ShoppingProviders.displayName = 'ShoppingProviders';

export default ShoppingProviders;
