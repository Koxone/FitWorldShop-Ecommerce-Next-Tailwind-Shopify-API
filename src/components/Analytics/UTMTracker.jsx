'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function UTMTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const discount = params.get('discount');
    const utm_source = params.get('utm_source');

    if (discount || utm_source) {
      setTimeout(() => {
        track('visit', {
          discount,
          utm_source,
        });
      }, 1000);
    }
  }, []);

  return null;
}
