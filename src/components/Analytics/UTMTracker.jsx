'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function UTMTracker() {
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;

    const discount = params.get('discount');
    const utm_source = params.get('utm_source');

    if (discount || utm_source) {
      track('visit', {
        discount,
        utm_source,
      });
    }
  }, []);

  return null;
}
