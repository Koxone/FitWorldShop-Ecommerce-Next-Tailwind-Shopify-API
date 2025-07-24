'use client';

import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';
import ShopifyProductCard from '@/components/cards/shopify/ShopifyProductCard';
import { useState } from 'react';
import ProductFiltersSidebar from '@/components/Navigation/AllProducts/ProductFiltersSidebar';

export default function ProductsView() {
  const { getScopeState, categoryLabels, searchQuery, setSearchQuery } =
    useCategoryFilter();
  const { setCategory, currentCategory } = getScopeState('all-products');
  const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  const clearSearch = () => {
    setSearchQuery('');
    setCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Filter Header */}
      <div className="sticky top-0 z-30 bg-gray-900 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold uppercase">Todos los productos</h1>
            <p className="text-sm text-gray-400">
              {currentCategory
                ? `Categoría: ${currentCategory}`
                : 'Todas las categorías'}
            </p>
          </div>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
              />
            </svg>
            Filtros
          </button>
        </div>

        {/* Mobile Search Results Indicator */}
        {searchQuery && (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3">
            <div>
              <p className="text-sm text-white">
                Resultados para:{' '}
                <span className="font-semibold">"{searchQuery}"</span>
              </p>
            </div>
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 rounded bg-gray-700 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-6 lg:px-6">
        {/* Desktop Sidebar */}
        <ProductFiltersSidebar
          categoryLabels={categoryLabels}
          currentCategory={currentCategory}
          setCategory={setCategory}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setMinRating={setMinRating}
        />

        {/* Mobile Filter Sidebar */}
        <ProductFiltersSidebar
          categoryLabels={categoryLabels}
          currentCategory={currentCategory}
          setCategory={(cat) => {
            setCategory(cat);
            setIsMobileFilterOpen(false);
          }}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setMinRating={setMinRating}
          isMobile={true}
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
        />

        {/* Main Content */}
        <div className="w-full px-4 pb-20 lg:px-0 lg:pb-10">
          {/* Desktop Heading */}
          <div className="hidden py-8 lg:block">
            <h1 className="font-montserrat mb-2 text-2xl font-bold uppercase md:text-3xl">
              todos los productos
            </h1>
            <p className="font-inter mb-6 text-gray-400">
              Descubre nuestra coleccion completa de Suplementos, Vitaminas y
              Ropa Deportiva.
            </p>

            {/* Desktop Search Results Indicator */}
            {searchQuery && (
              <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3">
                <div>
                  <p className="text-sm text-white">
                    Resultados para:{' '}
                    <span className="font-semibold">"{searchQuery}"</span>
                  </p>
                </div>
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-2 rounded bg-gray-700 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>

          {/* Products Cards */}
          <div className="pt-4 lg:pt-0">
            <ShopifyProductCard viewScope="all-products" />
          </div>
        </div>
      </div>
    </div>
  );
}
