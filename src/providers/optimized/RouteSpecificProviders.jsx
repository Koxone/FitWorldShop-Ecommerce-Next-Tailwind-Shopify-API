'use client';

import React, { memo } from 'react';
import { usePathname } from 'next/navigation';
import ProductProviders from './ProductProviders';
import ShoppingProviders from './ShoppingProviders';
import { BadgeProvider } from '@/context/product-card/BadgeContextOptimized';

// Wrapper inteligente que solo incluye los providers necesarios según la ruta
const RouteSpecificProviders = memo(({ children }) => {
  const pathname = usePathname();

  // Para páginas de productos individuales - necesitan todos los contextos de producto
  if (pathname?.includes('/product-open/')) {
    return (
      <ShoppingProviders>
        <ProductProviders>{children}</ProductProviders>
      </ShoppingProviders>
    );
  }

  // Para páginas que muestran productos (home, all-products, menu) - necesitan BadgeProvider
  const needsBadgeProvider = ['/', '/all-products', '/menu'].some((route) => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(route);
  });

  if (needsBadgeProvider) {
    return (
      <ShoppingProviders>
        <BadgeProvider>{children}</BadgeProvider>
      </ShoppingProviders>
    );
  }

  // Para páginas que NO necesitan funcionalidad de compras (solo auth pages específicas)
  const authOnlyPages = ['/auth/forgot-password', '/auth/reset-password'].some(
    (route) => pathname?.startsWith(route)
  );

  if (authOnlyPages) {
    // Estas páginas pueden no necesitar contextos de compras
    // Pero como el header usa usePurchase, necesitamos incluir ShoppingProviders
    return <ShoppingProviders>{children}</ShoppingProviders>;
  }

  // Para todas las demás páginas, incluir ShoppingProviders por defecto
  // Esto asegura que el header y otros componentes globales funcionen
  return <ShoppingProviders>{children}</ShoppingProviders>;
});

RouteSpecificProviders.displayName = 'RouteSpecificProviders';

export default RouteSpecificProviders;
