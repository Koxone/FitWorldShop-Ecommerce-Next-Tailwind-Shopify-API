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
        className="uppercase focus-ring font-sans cursor-pointer rounded-lg bg-surface text-text px-6 py-2.5 text-sm font-semibold transition-all duration-normal hover:bg-surface-hover hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 sm:px-8 sm:py-3 sm:text-base border border-border hover:border-primary"
      >
        ver todo
      </button>
    </div>
  );
}

export default ViewAllButton;
