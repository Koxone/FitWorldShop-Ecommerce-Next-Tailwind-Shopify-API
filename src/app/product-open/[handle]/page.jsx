// Open Product View
'use client';

// External
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';

// Hooks & Contexts
import useShopifyProducts from '@/hooks/useShopifyProducts';
import { useProductView } from '@/context/productView/ProductViewContext';
import { useBadge } from '@/components/productCard/context/BadgeContext';

// Icons & UI Components
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
} from '@/components/icons/Icons';
import ViewAllButton from '@/components/buttons/products/ViewAllButton';
import PromoSectionContainer from '@/components/containers/PromoSectionContainer';
import ExpandableText from '@/components/text/ExpandableText';
import ProductCarousel from '@/components/carousel/ProductCarousel';
import HomeProductCardsContainer from '@/components/containers/HomeProductCardsContainer';
import { useCategoryFilter } from '@/components/shopify/context/CategoryFilterContext';

export default function ProductOpenView() {
  // 1. Routing
  const pathname = usePathname();
  const { handle } = useParams();

  // 2. Remote data
  const { products, isLoading, isError } = useShopifyProducts();

  // 3. Global product context
  const {
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    isWishlisted,
    setIsWishlisted,
    productImages,
    setProductImages,
    currentColor,
    setCurrentColor,
  } = useProductView();

  // 4. Current product & derived data
  const product = products.find((p) => p.handle === handle);
  const images = product?.images?.edges || [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const currentImage =
    product?.id && productImages[product.id]
      ? productImages[product.id]
      : images[selectedImageIndex]?.node.url || product?.featuredImage?.url;

  const sizes =
    product?.options.find((o) => o.name.toLowerCase() === 'talla')?.values ||
    [];

  // 5. Badges
  const { getBadges } = useBadge();
  const badges = product ? getBadges(product) : [];
  const isNew = badges.includes('new');
  const isDiscount = badges.includes('discount');

  // 6. Local UI state
  const [currentTab, setCurrentTab] = useState('Description');
  const randomTags = useMemo(() => ['accesories', 'sale', 'new'], []);
  const [randomTag, setRandomTag] = useState(null);

  // 7. Effects
  useEffect(() => {
    if (pathname.startsWith('/product-open')) {
      const tag = randomTags[Math.floor(Math.random() * randomTags.length)];
      setRandomTag(tag);
    }
  }, [pathname, randomTags]);

  // 8. Helpers
  const toPascal = (str = '') =>
    str
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('');

  const changeQuantity = (delta) =>
    setQuantity((q) => Math.min(10, Math.max(1, q + delta)));

  const changeColor = (color) => {
    const variant = product.variants.edges.find((v) =>
      v.node.selectedOptions.some(
        (opt) => opt.name.toLowerCase() === 'color' && opt.value === color
      )
    );

    if (variant?.node.image?.url) {
      setProductImages((prev) => ({
        ...prev,
        [product.id]: variant.node.image.url,
      }));
    }

    setCurrentColor(toPascal(color));
  };

  const { categoryLabels } = useCategoryFilter();
  const productTag = product?.tags?.[0]?.toLowerCase() || '';
  const isVitaminOrSupplement = categoryLabels.some((label) =>
    ['vitaminas', 'suplementos'].includes(label.toLowerCase())
  );

  // 9. Loading / error states
  if (isLoading) return <p className="p-10 text-white">Cargando producto…</p>;
  if (isError)
    return <p className="p-10 text-red-500">Error al cargar producto.</p>;
  if (!product)
    return <p className="p-10 text-white">Producto no encontrado.</p>;

  // Render
  return (
    <div className="flex w-full max-w-[1200px] grid-cols-1 flex-wrap gap-4 self-center p-4 md:grid-cols-[1fr_1fr] md:gap-12 md:p-10">
      {/*  Galería  */}
      <div className="animate-slide-in-left flex max-h-[750px] max-w-[550px] flex-col items-center">
        {/* Imagen principal */}
        <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
          <Image
            src={currentImage}
            alt={product.title}
            width={800}
            height={800}
            priority
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {selectedImageIndex > 0 && (
            <button
              onClick={() => setSelectedImageIndex((i) => i - 1)}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            >
              <ChevronLeftIcon />
            </button>
          )}
          {selectedImageIndex < images.length - 1 && (
            <button
              onClick={() => setSelectedImageIndex((i) => i + 1)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>

        {/* Miniaturas */}
        <div className="flex gap-3 lg:flex lg:w-full lg:overflow-x-auto">
          {images.slice(0, 5).map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border ${
                selectedImageIndex === index
                  ? 'border-blue-500'
                  : 'border-gray-600'
              } cursor-pointer bg-gray-800 transition-all duration-200 hover:border-gray-400 lg:min-w-[190px]`}
            >
              <Image
                priority
                src={img.node.url}
                alt={`${product.title} thumbnail ${index + 1}`}
                width={200}
                height={200}
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Color Selector Mobile */}
      {!isVitaminOrSupplement && (
        <div className="block md:hidden">
          <div className="flex gap-2">
            {product.options
              .find((o) => o.name.toLowerCase() === 'color')
              ?.values.map((color) => (
                <span
                  key={color}
                  onClick={() => changeColor(color)}
                  className="h-10 w-10 cursor-pointer rounded-full border-2 border-white transition hover:scale-110"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
          </div>
        </div>
      )}

      {/*  Información y variantes  */}
      <div className="animate-slide-in-right max-w-[500px] text-white">
        <div className="mb-4 flex flex-wrap gap-2">
          {isNew && (
            <span className="inline-block rounded bg-white px-3 py-1 text-xs font-semibold text-gray-900">
              NEW
            </span>
          )}

          {isDiscount && (
            <span className="inline-block rounded bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              SALE
            </span>
          )}
        </div>

        <h1 className="font-montserrat mb-5 text-3xl font-bold md:text-4xl lg:text-5xl">
          {product.title}
        </h1>
        <h2>
          <ExpandableText text={`${product.description}`} />
        </h2>

        {/* Precio */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-2xl font-bold">
            ${product.variants.edges[0].node.price.amount}{' '}
            {product.variants.edges[0].node.price.currencyCode}
          </span>
          {product.compareAtPriceRange?.maxVariantPrice?.amount && (
            <span className="text-lg text-gray-500 line-through">
              ${product.compareAtPriceRange.maxVariantPrice.amount}
            </span>
          )}
        </div>

        {/* Color Selector Desktop */}
        {!isVitaminOrSupplement && (
          <div className="hidden md:block">
            <h3 className="mb-2 text-sm font-semibold">
              Color: {currentColor}
            </h3>
            <div className="mb-6 flex gap-2">
              {product.options
                .find((o) => o.name.toLowerCase() === 'color')
                ?.values.map((color) => (
                  <span
                    key={color}
                    onClick={() => changeColor(color)}
                    className="h-10 w-10 cursor-pointer rounded-full border-2 border-white transition hover:scale-110"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Tallas */}
        {!isVitaminOrSupplement && (
          <>
            <h3 className="mb-2 text-sm font-semibold">Talla</h3>
            <div className="mb-6 grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium ${
                    selectedSize === size
                      ? 'border-white bg-white text-gray-900'
                      : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Cantidad */}
        <h3 className="mb-2 text-sm font-semibold">Cantidad</h3>
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => changeQuantity(-1)}
            className="cursor-pointer rounded bg-gray-700 p-2 hover:bg-gray-600"
          >
            <MinusIcon size={14} />
          </button>
          <span className="px-3">{quantity}</span>
          <button
            onClick={() => changeQuantity(1)}
            className="cursor-pointer rounded bg-gray-700 p-2 hover:bg-gray-600"
          >
            <PlusIcon size={14} />
          </button>
        </div>

        {/* <AddToCartButton /> */}

        {/* CTA Wishlist / Compartir */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setIsWishlisted((w) => !w)}
            className={`rounded-lg border p-3 ${
              isWishlisted
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
            }`}
          >
            <HeartIcon size={18} filled={isWishlisted} />
          </button>
          <button className="rounded-lg border border-gray-600 p-3 text-gray-300 hover:border-white hover:text-white">
            <ShareIcon size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-700 pt-6">
          {['Description', 'Features', 'Care'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`mr-4 text-sm capitalize ${
                currentTab === tab
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}

          <div className="mt-4 text-sm whitespace-pre-line text-gray-300">
            {currentTab === 'Description' ? (
              <ExpandableText text={product.description} />
            ) : currentTab === 'Features' ? (
              product.metafield?.value || 'No features available.'
            ) : (
              'Care instructions here.'
            )}
          </div>
        </div>
      </div>

      {/*  Sección inferior */}
      <div className="mt-10 flex w-full flex-col gap-10 pb-[100px]">
        <HomeProductCardsContainer
            title="Ropa Deportiva"
            subtitle="Para Hombre y Mujer"
            filterType="gender"
          />
        <ViewAllButton />
        <PromoSectionContainer
          title="Categorías"
          subtitle="Podría interesarte"
          type="categories"
        />
        <ProductCarousel />
      </div>
    </div>
  );
}
