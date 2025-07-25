'use client';

import { useState } from 'react';
import GeneralModal from '@/components/Feedback/Modals/GeneralModal';
import UsernameModal from '@/components/Feedback/Modals/UsernameModal';
import { HeartIcon } from '@/components/icons/Icons';
import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';

export default function WishlistButton({ productId, product, className = '' }) {
  const { isLoggedIn, username, wishlistedProducts, setWishlistedProducts } =
    useShopifyAuthContext();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);

  const isWishlisted = wishlistedProducts.some((p) => p.id === productId);

  const handleClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }

    if (!username) {
      setUsernameModalOpen(true);
      return;
    }

    if (isWishlisted) {
      setWishlistedProducts((prev) => prev.filter((p) => p.id !== productId));
    } else {
      if (!product) {
        setWishlistedProducts((prev) => [...prev, { id: productId }]);
        return;
      }

      const productData = {
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.featuredImage?.url || product.image?.src || '',
        price:
          product.price ||
          product.variants?.[0]?.price?.amount ||
          product.priceRange?.minVariantPrice?.amount ||
          0,
        handle: product.handle,
        selectedColor: product.selectedColor || null,
        selectedSize: product.selectedSize || null,
      };

      setWishlistedProducts((prev) => [...prev, productData]);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`bg-opacity-50 hover:bg-opacity-75 focus-ring absolute top-3 right-3 z-50 cursor-pointer rounded-full bg-black p-2 transition-all duration-200 ease-in-out group-hover:opacity-100 hover:scale-125 lg:opacity-0 ${className}`}
      >
        <HeartIcon
          size={16}
          filled={isWishlisted}
          className={isWishlisted ? 'text-red-500' : 'text-white'}
        />
      </button>

      {/* Modal login */}
      <GeneralModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      >
        <div className="p-4 text-center">
          <p className="mb-4 text-lg font-semibold">Debes iniciar sesión</p>
          <p className="mb-4 text-sm text-gray-400">
            Para usar la wishlist, primero inicia sesión en tu cuenta.
          </p>
          <button
            onClick={() => {
              setLoginModalOpen(false);
              window.location.href =
                'https://account.fitworldshop.com/?return_url=https://www.fitworldshop.com/user-profile';
            }}
            className="cursor-pointer rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
          >
            Iniciar sesión
          </button>
        </div>
      </GeneralModal>

      {/* Modal username */}
      <UsernameModal
        isOpen={usernameModalOpen}
        onClose={() => setUsernameModalOpen(false)}
      />
    </div>
  );
}
