'use client';

import React, { memo, useEffect } from 'react';
import GlobalProviders from './AppProviders';
import RouteSpecificProviders from './RouteSpecificProviders';

const OptimizedProviders = memo(({ children }) => {
  // Obtener AccountNumber de Shopify desde URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Buscar parámetro ?accountnumber= en la URL
      const params = new URLSearchParams(window.location.search);
      const accountNumber = params.get('accountnumber');

      if (accountNumber) {
        console.log('[Shopify Customer ID]', accountNumber);
        localStorage.setItem('shopify_customer_id', accountNumber);
      }

      const email = localStorage.getItem('shopify_customer_email');
      const id = localStorage.getItem('shopify_customer_id');
      const firstName = localStorage.getItem('shopify_customer_first_name');

      if (email) {
        console.log('[Shopify Customer Email]', email);
      } else if (id) {
        console.log('[Shopify Customer ID from localStorage]', id);
      } else {
        console.log('[Shopify Customer] No data found in localStorage');
      }
    }
  }, []);

  return (
    <GlobalProviders>
      <RouteSpecificProviders>{children}</RouteSpecificProviders>
    </GlobalProviders>
  );
});

OptimizedProviders.displayName = 'OptimizedProviders';

export default OptimizedProviders;
