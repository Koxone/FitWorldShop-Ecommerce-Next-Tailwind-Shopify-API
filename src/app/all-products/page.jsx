'use client';

import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';
import ShopifyProductCard from '@/components/cards/shopify/ShopifyProductCard';
import { useState } from 'react';
import ProductFiltersSidebar from '@/components/Navigation/AllProducts/ProductFiltersSidebar';

export default function ProductsView() {
  const { getScopeState, categoryLabels } = useCategoryFilter();
  const { setCategory, currentCategory } = getScopeState('all-products');
  const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Filter Header */}
      <div className="sticky top-16 z-30 bg-gray-900 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold uppercase">Todos los productos</h1>
            <p className="text-sm text-gray-400">
              {currentCategory ? `Categoría: ${currentCategory}` : 'Todas las categorías'}
            </p>
          </div>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            Filtros
          </button>
        </div>
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
          setCategory={setCategory}
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
              Descubre nuestra coleccion completa de Ropa y Accesorios.
            </p>
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
