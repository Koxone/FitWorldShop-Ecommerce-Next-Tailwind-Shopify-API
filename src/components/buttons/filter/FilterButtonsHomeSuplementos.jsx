'use client';

import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';

export default function FilterButtonsHomeSuplementos({ viewScope }) {
  const { getScopeState, categoryLabels } = useCategoryFilter();
  const { setCategory, currentCategory } = getScopeState(viewScope);

  return (
    <div className="flex gap-2">
      {['Todos', 'Vitaminas', 'Suplementos', 'Novedades'].map((label) => (
        <button
          key={label}
          onClick={() => setCategory(label)}
          className={`font-poppins w-fit cursor-pointer rounded-md border px-2 py-2 font-medium uppercase transition-all duration-200 md:px-6 ${
            currentCategory === label
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
