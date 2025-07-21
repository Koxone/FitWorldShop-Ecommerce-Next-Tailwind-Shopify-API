'use client';

import { usePathname, useRouter } from 'next/navigation';
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

// Categories Map
const labelToTagMap = {
  Vitaminas: 'Vitaminas',
  Suplementos: 'Suplementos',
  Mujer: 'women',
  Hombre: 'men',
};

export default function ShopifyProductCard({ selectedCategory }) {
  const pathname = usePathname();
  const [productImages, setProductImages] = useState({});

  const { products, isLoading, isError } = useShopifyProducts();

  // Category Text to Tag
  const tag = selectedCategory ? labelToTagMap[selectedCategory] : null;

  const filteredProducts = useMemo(() => {
    if (!tag) return products;
    return products?.filter((product) =>
      product.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }, [products, tag]);

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
          {/* IMAGE */}
          <ImageRender product={product} productImages={productImages} />
          {/* DETAILS */}
          <div className="flex flex-col gap-1 p-3 md:p-4">
            {/* COLOR SELECTOR */}
            <ColorSelector product={product} />
            {/* Title */}
            <h2 className="font-montserrat text-lg font-semibold text-white group-hover:text-gray-300 md:mb-1">
              {product.title}
            </h2>
            {/* Description */}
            <p className="font-inter mb-2 max-h-20 overflow-y-auto text-sm text-gray-400 md:block">
              {product.description}
            </p>
            {/* Precio */}
            <Price product={product} />

            {/* Vendedor */}
            <p className="mt-1 hidden text-xs text-gray-500 md:block">
              Vendedor: {product.vendor || 'Sin especificar'}
            </p>

            {/* Categoria */}
            <CategoryTags product={product} />

            {/* SIZE SELECTOR */}
            <SizeSelector product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}
