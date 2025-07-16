'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 2000); // 2 segundos
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex md:hidden items-center justify-center bg-[#101828] text-white">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="FitWorld Logo"
          className="mx-auto mb-4 h-60 w-60 animate-pulse object-contain"
        />
      </div>
    </div>
  );
}
