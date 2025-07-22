import { useRouter } from 'next/navigation';
import React from 'react';

function ViewAllButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/all-products');
  };

  return (
    <div className="animate-fade-in self-center text-center">
      <button
        onClick={handleClick}
        className="hover-lift uppercase focus-ring font-poppins cursor-pointer rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-400 sm:px-8 sm:py-3 sm:text-base"
      >
        ver todo
      </button>
    </div>
  );
}

export default ViewAllButton;
