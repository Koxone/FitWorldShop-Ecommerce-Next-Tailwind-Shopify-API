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
  const { getScopeState, isLoading, isError, mapTextToShopifyCategory } =
    useCategoryFilter();

  const [productImages, setProductImages] = useState({});
  const { products } = useShopifyProducts();
  const { currentCategory } = getScopeState(viewScope);

  const tag = mapTextToShopifyCategory(currentCategory);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const tagLower = tag?.toLowerCase();

    return products.filter((product) => {
      const tags = product.tags?.map((t) => t.toLowerCase()) || [];

      if (tagLower) {
        return tags.includes(tagLower);
      }
      switch (viewScope) {
        case 'home':
          return tags.includes('ropa');
        case 'supplements':
          return tags.includes('vitaminas') || tags.includes('suplementos');
        default:
          return true; 
      }
    });
  }, [products, tag, viewScope]);

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
          ? 'mx-auto flex w-full flex-nowrap gap-5 overflow-x-auto'
          : 'grid grid-cols-[1fr_1fr] gap-5 px-2 lg:grid-cols-[1fr_1fr_1fr] xl:grid-cols-4'
      }`}
    >
      {filteredProducts?.map((product) => (
        <div
          key={product.id}
          className={`group hover-lift relative overflow-hidden rounded-lg border border-neutral-300/10 bg-gray-800 transition-all duration-300 ${
            pathname === '/' || pathname.startsWith('/product-open')
              ? 'max-w-[300px] min-w-[250px] flex-shrink-0'
              : 'w-full'
          }`}
        >
          <WishlistButton productId={product.id} />
          <Badges product={product} />
          <ImageRender product={product} productImages={productImages} />

          <div className="flex flex-col gap-1 p-3 md:p-4">
            <ColorSelector product={product} />
            <h2 className="font-montserrat text-lg font-semibold text-white group-hover:text-gray-300 md:mb-1">
              {product.title}
            </h2>
            <p className="font-inter mb-2 max-h-20 overflow-y-auto text-sm text-gray-400 md:block">
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
