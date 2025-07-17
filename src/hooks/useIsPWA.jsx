'use client'

import { useEffect, useState } from 'react';

export default function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsPWA(isStandalone);
  }, []);

  return isPWA;
}
