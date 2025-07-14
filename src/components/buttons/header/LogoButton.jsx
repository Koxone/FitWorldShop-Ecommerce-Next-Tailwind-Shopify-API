'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function LogoButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };
  return (
    <button
      onClick={handleClick}
      className="flex max-w-[120px] cursor-pointer items-center md:h-[37px] md:max-w-[160px]"
    >
      <img src="/logo.png" alt="" />
    </button>
  );
}

export default LogoButton;
