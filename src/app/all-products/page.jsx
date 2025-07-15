// All Products View

'use client';

import { useCategoryFilter } from '@/components/shopify/context/CategoryFilterContext';
import ShopifyProductCard from '@/components/shopify/ShopifyProductCard';

export default function ProductsView() {
  const { setCategory, currentCategory, categoryLabels } = useCategoryFilter();

  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] overflow-x-hidden bg-gray-900 py-8 text-white sm:px-6 lg:px-8">
      {/* Sidebar */}
      <div className="hidden md:block">
        <div className="flex flex-col rounded-lg bg-gray-800 p-4">
          {categoryLabels.map((label) => (
            <button
              key={label}
              onClick={() => setCategory(label)}
              className={`cursor-pointer rounded-lg border px-4 py-2 uppercase transition ${
                currentCategory === label
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="px-3 md:px-10">
          <h1 className="font-montserrat mb-2 text-2xl font-bold uppercase md:text-3xl">
            todos los productos
          </h1>
          <p className="font-inter mb-6 text-gray-400">
            Descubre nuestra coleccion completa de Ropa y Accesorios.
          </p>
        </div>

        {/* Products Cards */}
        <div>
          <ShopifyProductCard />
        </div>
      </div>
    </div>
  );
}
