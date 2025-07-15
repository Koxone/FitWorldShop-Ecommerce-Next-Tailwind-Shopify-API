// components/buttons/filter/GenderFilterButton.jsx
'use client';

import { useCategoryFilter } from '@/components/shopify/context/CategoryFilterContext';

function GenderFilterButton({ text }) {
  const { setCategory, currentCategory } = useCategoryFilter();

  const label = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const isActive = currentCategory === label;

  const handleClick = () => setCategory(label);



  return (
    <button
      onClick={handleClick}
      className={`font-poppins w-fit cursor-pointer rounded-md border px-2 py-2 font-medium uppercase transition-all duration-200 md:px-6 ${
        isActive
          ? 'bg-gray-700 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {text}
    </button>
  );
}

export default GenderFilterButton;
