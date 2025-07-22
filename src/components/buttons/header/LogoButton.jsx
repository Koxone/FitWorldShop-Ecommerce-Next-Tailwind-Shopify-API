'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function LogoButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="relative cursor-pointer h-[40px] w-[120px] md:h-[50px] md:w-[160px] transition-all duration-normal hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        fill
        sizes="(max-width: 768px) 120px, 160px"
        style={{ objectFit: 'contain' }}
        priority
      />
    </button>
  );
}

export default LogoButton;
