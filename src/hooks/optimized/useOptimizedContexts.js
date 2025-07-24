'use client';

// Re-exports de los contextos optimizados para mantener compatibilidad

// Exports originales que mantienen los nombres existentes
export { useAuth } from '@/context/Auth/AuthContextOptimized';

export { usePurchase } from '@/context/Cart/PurchaseContextOptimized';

export { useCategoryFilter } from '@/context/filters/CategoryFilterContextOptimized';

export { useProductView } from '@/context/productView/ProductViewContextOptimized';

export { useWishlist } from '@/context/product-card/WishlistContextOptimized';

export { useBadge } from '@/context/product-card/BadgeContextOptimized';

// Hook para el contexto de ImageSource (ya optimizado)
export { useImageSourceContext } from '@/context/general/ImageSourceContext';

// Exports específicos optimizados
export {
  useCartItems,
  useCartTotals,
  useCartActions,
  useCartToggle,
} from '@/context/Cart/PurchaseContextOptimized';

export {
  useCategoryState,
  useProductSearch,
  useProductFilters,
  useProducts,
} from '@/context/filters/CategoryFilterContextOptimized';

export {
  useProductSelection,
  useProductQuantity,
  useProductWishlist,
  useProductImages,
} from '@/context/productView/ProductViewContextOptimized';

export {
  useWishlistActions,
  useWishlistStats,
  useIsWishlisted,
} from '@/context/product-card/WishlistContextOptimized';

export { useProductBadges } from '@/context/product-card/BadgeContextOptimized';
