import { useEffect, useState } from 'react';

export default function useIsPWA() {
  const [isPWA, setIsPWA] = useState(null);

  useEffect(() => {
    const isStandaloneDisplay = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isIOSStandalone = window.navigator.standalone === true;

    const isPWAEnv = isStandaloneDisplay || isIOSStandalone;

    setIsPWA(isPWAEnv);
  }, []);

  return isPWA;
}
