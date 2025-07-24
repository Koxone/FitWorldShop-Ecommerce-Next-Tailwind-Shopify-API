'use client';

import { createContext, useContext, useMemo, useCallback } from 'react';

const BadgeContext = createContext();

export function BadgeProvider({ children }) {
  const getBadges = useCallback((product) => {
    if (!product) return [];

    const badges = [];

    // Badge "NEW" si incluye un tag 'new' (insensible a mayúsculas)
    const hasNewTag = product.tags?.some((tag) => tag.toLowerCase() === 'new');
    if (hasNewTag) badges.push('new');

    // Badge de descuento si existe un precio de comparación válido
    const price = parseFloat(product.variants?.edges?.[0]?.node?.price?.amount);
    const compareAt = parseFloat(
      product.variants?.edges?.[0]?.node?.compareAtPrice?.amount
    );
    if (!isNaN(price) && !isNaN(compareAt) && compareAt > price) {
      badges.push('discount');
    }

    return badges;
  }, []);

  const discountCalculation = useCallback((product) => {
    if (!product) return null;

    const variant = product.variants?.edges?.[0]?.node;

    if (!variant?.price?.amount || !variant?.compareAtPrice?.amount)
      return null;

    const precio = parseFloat(variant.price.amount);
    const precioOriginal = parseFloat(variant.compareAtPrice.amount);

    if (precioOriginal <= precio) return null;

    const descuento = ((precioOriginal - precio) / precioOriginal) * 100;

    return Math.round(descuento);
  }, []);

  // Get badge styles based on badge type
  const getBadgeStyles = useCallback((badgeType) => {
    const styles = {
      new: {
        background: 'bg-green-500',
        text: 'text-white',
        label: 'NUEVO',
      },
      discount: {
        background: 'bg-red-500',
        text: 'text-white',
        label: 'OFERTA',
      },
    };

    return styles[badgeType] || styles.new;
  }, []);

  // Check if product has specific badge
  const hasBadge = useCallback(
    (product, badgeType) => {
      const badges = getBadges(product);
      return badges.includes(badgeType);
    },
    [getBadges]
  );

  // Get formatted discount percentage
  const getDiscountPercentage = useCallback(
    (product) => {
      const discount = discountCalculation(product);
      return discount ? `${discount}%` : null;
    },
    [discountCalculation]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      getBadges,
      discountCalculation,
      getBadgeStyles,
      hasBadge,
      getDiscountPercentage,
    }),
    [
      getBadges,
      discountCalculation,
      getBadgeStyles,
      hasBadge,
      getDiscountPercentage,
    ]
  );

  return (
    <BadgeContext.Provider value={contextValue}>
      {children}
    </BadgeContext.Provider>
  );
}

export const useBadge = () => {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useBadge must be used within a BadgeProvider');
  }
  return context;
};

// Hook específico para obtener badges de un producto
export const useProductBadges = (product) => {
  const { getBadges, discountCalculation, getDiscountPercentage } = useBadge();

  return useMemo(
    () => ({
      badges: getBadges(product),
      discount: discountCalculation(product),
      discountPercentage: getDiscountPercentage(product),
      hasDiscount: discountCalculation(product) !== null,
      isNew: getBadges(product).includes('new'),
    }),
    [product, getBadges, discountCalculation, getDiscountPercentage]
  );
};
