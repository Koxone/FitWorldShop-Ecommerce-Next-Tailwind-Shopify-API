'use client';

import { BadgeProvider } from '@/context/product-card/BadgeContext';
import { WishlistProvider } from '@/context/product-card/WishlistContext';

/**
 * Product-related contexts provider for product cards
 * Used for pages that display product cards and need badge/wishlist functionality
 * Note: CategoryFilterContext is now global since MainHeader needs it
 */
export default function ProductContextProvider({ children }) {
  return (
    <BadgeProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </BadgeProvider>
  );
}