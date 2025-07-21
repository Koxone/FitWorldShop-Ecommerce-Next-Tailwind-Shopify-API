'use client';

import { createContext, useContext } from 'react';

const BadgeContext = createContext();

export function BadgeProvider({ children }) {
  const getBadges = (product) => {
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
  };

  function discountCalculation(product) {
    const variant = product.variants?.edges?.[0]?.node;

    if (!variant?.price?.amount || !variant?.compareAtPrice?.amount)
      return null;

    const precio = parseFloat(variant.price.amount);
    const precioOriginal = parseFloat(variant.compareAtPrice.amount);

    if (precioOriginal <= precio) return null;

    const descuento = ((precioOriginal - precio) / precioOriginal) * 100;

    return Math.round(descuento); 
  }

  return (
    <BadgeContext.Provider value={{ getBadges, discountCalculation }}>
      {children}
    </BadgeContext.Provider>
  );
}

export const useBadge = () => useContext(BadgeContext);
