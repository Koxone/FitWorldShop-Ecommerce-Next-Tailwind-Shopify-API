'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 3000); // 2 segundos
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#101828] text-white md:hidden">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="FitWorld Logo"
          width={240}
          height={240}
          className="mx-auto mb-4 h-60 w-60 animate-pulse object-contain"
        />
      </div>
    </div>
  );
}
