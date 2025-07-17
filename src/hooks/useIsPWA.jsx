import { useState, useEffect } from 'react';

export default function useIsPWA() {
  const [isPWA, setIsPWA] = useState(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true || // iOS Safari
      document.referrer.includes('android-app://'); // Trusted Web Activities (Android)

    setIsPWA(isStandalone);
  }, []);

  return isPWA;
}
