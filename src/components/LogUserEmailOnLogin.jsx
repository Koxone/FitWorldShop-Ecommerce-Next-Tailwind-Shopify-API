'use client';

import { useEffect } from 'react';
import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';

export default function LogUserEmailOnLogin() {
  const { isLoggedIn, clientNumber } = useShopifyAuthContext();

  useEffect(() => {
    if (isLoggedIn && clientNumber) {
      console.log('📧 Usuario autenticado con Shopify ID:', clientNumber);
    }
  }, [isLoggedIn, clientNumber]);

  return null;
}
