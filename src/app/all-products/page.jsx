'use client';

import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';
import ShopifyProductCard from '@/components/cards/shopify/ShopifyProductCard';
import { useState } from 'react';
import ProductFiltersSidebar from '@/components/Navigation/AllProducts/ProductFiltersSidebar';

export default function ProductsView() {
  const { getScopeState, categoryLabels, searchQuery, setSearchQuery } = useCategoryFilter();
  const { setCategory, currentCategory } = getScopeState('all-products');
  const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  const clearSearch = () => {
    setSearchQuery('');
    setCategory(null);
  };

  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] overflow-x-hidden bg-gray-900 py-8 text-white sm:px-6 md:gap-10 lg:px-8">
      {/* Sidebar Desktop */}
      <ProductFiltersSidebar
        categoryLabels={categoryLabels}
        currentCategory={currentCategory}
        setCategory={setCategory}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setMinRating={setMinRating}
      />

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl pb-[100px]">
        {/* Heading */}
        <div className="px-3">
          <h1 className="font-montserrat mb-2 text-2xl font-bold uppercase md:text-3xl">
            todos los productos
          </h1>
          <p className="font-inter mb-4 text-gray-400">
            Descubre nuestra coleccion completa de Ropa y Accesorios.
          </p>
          
          {/* Search Results Indicator */}
          {searchQuery && (
            <div className="mb-4 flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div>
                <p className="text-white text-sm">
                  Resultados para: <span className="font-semibold">"{searchQuery}"</span>
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>

        {/* Products Cards */}
        <div>
          <ShopifyProductCard viewScope="all-products" />
        </div>
      </div>
    </div>
  );
}
