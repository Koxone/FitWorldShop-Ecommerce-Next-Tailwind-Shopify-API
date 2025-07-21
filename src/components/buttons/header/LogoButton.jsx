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
      className="flex max-w-[120px] cursor-pointer items-center md:h-[37px] md:max-w-[160px]"
    >
      <Image src="/logo.png" alt="Logo" width={130} height={100} />
    </button>
  );
}

export default LogoButton;
