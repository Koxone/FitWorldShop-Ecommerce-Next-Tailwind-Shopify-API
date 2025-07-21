'use client';

// External
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

// Hooks & Contexts
import useShopifyProducts from '@/hooks/useShopifyProducts';
import { useProductView } from '@/context/productView/ProductViewContext';
import { useBadge } from '@/context/product-card/BadgeContext';

// Icons & UI Components
import { HeartIcon, ShareIcon } from '@/components/icons/Icons';
import ViewAllButton from '@/components/buttons/general/ViewAllButton';
import PromoSectionContainer from '@/components/containers/general/PromoSectionContainer';
import ExpandableText from '@/components/text/ExpandableText';
import ProductCarousel from '@/components/carousels/General/ProductCarousel';
import AddToCartButton from '@/components/buttons/product-open/AddToCartButton';
import Rating from '@/components/Decoration/ProductOpenView/Rating';
import ProductGallery from '@/components/carousels/ProductOpen/ProductGallery';
import ColorSelectorMobile from '@/components/Views/ProductOpen/ColorSelectorMobile';
import ProductColorSelectorDesktop from '@/components/Views/ProductOpen/ProductColorSelectorDesktop';
import ProductSizeSelector from '@/components/Views/ProductOpen/ProductSizeSelector';
import ProductQuantitySelector from '@/components/Views/ProductOpen/ProductQuantitySelector';
import ShopifyProductCard from '@/components/cards/shopify/ShopifyProductCard';
import FilterButtonsHomeRopa from '@/components/buttons/filter/FilterButtonsHomeRopa';
import FilterButtonsHomeSuplementos from '@/components/buttons/filter/FilterButtonsHomeSuplementos';
import RevealOnScroll from '@/Styles/RevealOnScroll';

export default function ProductOpenView() {
  const pathname = usePathname();
  const { handle } = useParams();

  const { products, isLoading, isError } = useShopifyProducts();

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

  const product = products.find((p) => p.handle === handle);
  const images = product?.images?.edges || [];

  const sizes =
    product?.options.find((o) => o.name.toLowerCase() === 'talla')?.values ||
    [];

  const { getBadges } = useBadge();
  const badges = product ? getBadges(product) : [];
  const isNew = badges.includes('new');
  const isDiscount = badges.includes('discount');

  const [currentTab, setCurrentTab] = useState('Description');
  const randomTags = useMemo(() => ['accesories', 'sale', 'new'], []);
  const [randomTag, setRandomTag] = useState(null);

  useEffect(() => {
    if (pathname.startsWith('/product-open')) {
      const tag = randomTags[Math.floor(Math.random() * randomTags.length)];
      setRandomTag(tag);
    }
  }, [pathname, randomTags]);

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

  const productTags = product?.tags?.map((tag) => tag.toLowerCase()) || [];
  const isVitaminOrSupplement = productTags.some((tag) =>
    ['vitaminas', 'suplementos'].includes(tag)
  );

  if (isLoading) return <p className="p-10 text-white">Cargando producto…</p>;
  if (isError)
    return <p className="p-10 text-red-500">Error al cargar producto.</p>;
  if (!product)
    return <p className="p-10 text-white">Producto no encontrado.</p>;

  return (
    <div className="flex w-full max-w-[1200px] grid-cols-1 flex-wrap gap-4 self-center p-4 md:grid-cols-[1fr_1fr] md:gap-12 md:p-10">
      {/* Galería */}
      <RevealOnScroll>
        <ProductGallery
          product={product}
          images={images}
          overrideImage={productImages[product.id]}
        />
      </RevealOnScroll>

      {/* Selector de color (mobile) */}
      <ColorSelectorMobile
        product={product}
        onColorChange={changeColor}
        isHidden={isVitaminOrSupplement}
      />

      {/* Información y variantes */}
      <div className="animate-slide-in-right flex max-w-[500px] flex-col gap-6 text-white">
        <div className="flex flex-wrap gap-2">
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

        <div className="flex flex-col gap-6">
          <h1 className="font-montserrat text-3xl font-bold md:text-4xl lg:text-5xl">
            {product.title}
          </h1>
          <h2>
            <ExpandableText text={`${product.description}`} />
          </h2>
        </div>

        <Rating product={product} />

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-white">
            ${product.variants.edges[0].node.price.amount}{' '}
            {product.variants.edges[0].node.price.currencyCode}
          </span>

          {product.compareAtPriceRange?.maxVariantPrice?.amount &&
            parseFloat(product.compareAtPriceRange.maxVariantPrice.amount) >
              parseFloat(product.variants.edges[0].node.price.amount) && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ${product.compareAtPriceRange.maxVariantPrice.amount}
                </span>
                <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  Ahorro $
                  {(
                    parseFloat(
                      product.compareAtPriceRange.maxVariantPrice.amount
                    ) - parseFloat(product.variants.edges[0].node.price.amount)
                  ).toFixed(2)}
                </span>
              </>
            )}
        </div>

        <ProductColorSelectorDesktop
          isVitaminOrSupplement={isVitaminOrSupplement}
          product={product}
          currentColor={currentColor}
          changeColor={changeColor}
        />

        <ProductSizeSelector
          isVitaminOrSupplement={isVitaminOrSupplement}
          sizes={sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <ProductQuantitySelector
          quantity={quantity}
          changeQuantity={changeQuantity}
        />

        <div className="flex gap-3">
          <AddToCartButton />
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

      {/* Sección inferior de productos relacionados */}
      <div className="flex w-full flex-col gap-10 pt-6 pb-[100px]">
        <RevealOnScroll>
          {isVitaminOrSupplement ? (
            <div className="flex flex-col gap-6">
              <div className="animate-fade-in text-left">
                <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
                  Ropa Recomendada
                </h2>
                <h2 className="text-2xl font-bold tracking-wider text-white uppercase">
                  Podría Interesarte
                </h2>
              </div>
              <FilterButtonsHomeRopa viewScope="ropa" />
              <ShopifyProductCard viewScope="ropa" />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="animate-fade-in text-left">
                <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
                  Para tu Salud
                </h2>
                <h2 className="text-2xl font-bold tracking-wider text-white uppercase">
                  Podría Interesarte
                </h2>
              </div>
              <FilterButtonsHomeSuplementos viewScope="salud" />
              <ShopifyProductCard viewScope="salud" />
            </div>
          )}
        </RevealOnScroll>

        <RevealOnScroll>
          <ViewAllButton />
        </RevealOnScroll>

        <RevealOnScroll>
          <PromoSectionContainer
            title="Categorías"
            subtitle="Podría interesarte"
            type="categories"
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <ProductCarousel />
        </RevealOnScroll>
      </div>
    </div>
  );
}
