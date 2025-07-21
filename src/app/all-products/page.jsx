'use client';

import { useCategoryFilter } from '@/context/CategoryFilterContext';
import ShopifyProductCard from '@/components/cards/shopify/ShopifyProductCard';
import { useState } from 'react';
import ProductFiltersSidebar from '@/components/Navigation/AllProducts/ProductFiltersSidebar';

export default function ProductsView() {
  const { setCategory, currentCategory, categoryLabels } = useCategoryFilter();
  const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);

  const toggleShowMore = () => setShowMore((prev) => !prev);

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
