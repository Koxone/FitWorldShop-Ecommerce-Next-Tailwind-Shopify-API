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
      className="relative cursor-pointer h-[40px] w-[120px] md:h-[50px] md:w-[160px]"
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
