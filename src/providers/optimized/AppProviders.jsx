'use client';

import React, { memo } from 'react';
import { AuthProvider } from '@/context/Auth/AuthContextOptimized';
import { CategoryFilterProvider } from '@/context/filters/CategoryFilterContextOptimized';
import { ImageSourceProvider } from '@/context/general/ImageSourceContext';
import I18nProvider from '@/providers/I18nProvider';
import { ShopifyAuthProvider } from '@/context/Auth/ShopifyAuthContext';

// Provider para contextos globales que raramente cambian
const GlobalProviders = memo(({ children }) => {
  return (
    <ShopifyAuthProvider>
      <AuthProvider>
        <ImageSourceProvider>
          <CategoryFilterProvider>
            <I18nProvider>{children}</I18nProvider>
          </CategoryFilterProvider>
        </ImageSourceProvider>
      </AuthProvider>
    </ShopifyAuthProvider>
  );
});

GlobalProviders.displayName = 'GlobalProviders';

export default GlobalProviders;
