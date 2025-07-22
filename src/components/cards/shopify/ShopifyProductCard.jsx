'use client';

import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import useShopifyProducts from '@/hooks/useShopifyProducts';

// Card Components
import SizeSelector from './Components/SizeSelector/SizeSelector';
import CategoryTags from './Components/Category/CategoryTags';
import Price from './Components/Price/Price';
import ColorSelector from './Components/ColorSelector/ColorSelector';
import ImageRender from './Components/ImageRender/ImageRender';
import WishlistButton from './Components/Wishlist/WishlistButton';
import Badges from './Components/Badges/Badges';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';

export default function ShopifyProductCard({ viewScope }) {
  const pathname = usePathname();
  const { getScopeState, isLoading, isError, mapTextToShopifyCategory, searchQuery } =
    useCategoryFilter();

  const [productImages, setProductImages] = useState({});
  const { products } = useShopifyProducts();

  const { currentCategory } = getScopeState(viewScope);
  const tag = mapTextToShopifyCategory(currentCategory);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const tagLower = tag?.toLowerCase();
    const hasSearchQuery = searchQuery && searchQuery.trim();

    let result = products.filter((product) => {
      const tags = product.tags?.map((t) => t.toLowerCase()) || [];

      // If there's a search query, filter by search first
      if (hasSearchQuery && viewScope === 'all-products') {
        const searchTerm = searchQuery.toLowerCase().trim();
        const title = product.title?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        
        const matchesSearch = 
          title.includes(searchTerm) ||
          tags.some(tag => tag.includes(searchTerm)) ||
          description.includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Then apply category filters
      if (tagLower) return tags.includes(tagLower);

      switch (viewScope) {
        case 'home':
        case 'ropa':
          return tags.includes('ropa');
        case 'supplements':
          return tags.includes('vitaminas') || tags.includes('suplementos');
        case 'vitamins':
          return tags.includes('vitaminas');
        case 'offers':
          return tags.includes('sale');
        case 'new':
          return tags.includes('new');
        case 'accesories':
          return tags.includes('accesories');
        case 'salud':
          return (
            tags.includes('salud') ||
            tags.includes('vitaminas') ||
            tags.includes('suplementos')
          );

        default:
          return true;
      }
    });

    // Only randomize if there's no search query
    if (!hasSearchQuery || viewScope !== 'all-products') {
      return [...result].sort(() => Math.random() - 0.5);
    }

    return result;
  }, [products, tag, viewScope, searchQuery]);

  if (isLoading) {
    return <div className="p-4 text-center">Cargando productos...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error al cargar productos
      </div>
    );
  }

  return (
    <div
      className={`${
        pathname === '/' || pathname.startsWith('/product-open')
          ? 'mx-auto flex w-full flex-nowrap gap-3 sm:gap-4 md:gap-5 overflow-x-auto'
          : 'grid grid-cols-1 gap-3 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 lg:gap-5'
      }`}
    >
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className={`group hover-lift relative overflow-hidden rounded-lg border border-neutral-300/10 bg-gray-800 transition-all duration-300 ${
            pathname === '/' || pathname.startsWith('/product-open')
              ? 'max-w-[280px] min-w-[240px] flex-shrink-0 sm:max-w-[300px] sm:min-w-[260px]'
              : 'w-full'
          }`}
        >
          <WishlistButton productId={product.id} />
          <Badges product={product} />
          <ImageRender product={product} productImages={productImages} />

          <div className="flex flex-col gap-1 p-3 md:p-4">
            <ColorSelector product={product} />
            <h2 className="font-montserrat text-base font-semibold text-white group-hover:text-gray-300 sm:text-lg md:mb-1">
              {product.title}
            </h2>
            <p className="font-inter mb-2 max-h-16 overflow-y-auto text-xs text-gray-400 sm:text-sm md:block">
              {product.description}
            </p>
            <Price product={product} />
            <p className="mt-1 hidden text-xs text-gray-500 md:block">
              Vendedor: {product.vendor || 'Sin especificar'}
            </p>
            <CategoryTags product={product} />
            <SizeSelector product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}
