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
        className="hover-lift focus-ring font-poppins cursor-pointer rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-400"
      >
        View All
      </button>
    </div>
  );
}

export default ViewAllButton;
