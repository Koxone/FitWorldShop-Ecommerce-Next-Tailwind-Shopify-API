'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import generalTextData from '@/data/generalText/generalTextData';
import LogoButton from '../../buttons/header/LogoButton';
import HeaderButton from '../../buttons/header/HeaderButton';
import { HeartIcon, ShoppingCartIconNew } from '../../icons/Icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthDEPRECATED/AuthContextOptimized';
import {
  useCartToggle,
  useCartTotals,
} from '@/context/Cart/PurchaseContextOptimized';
import { useCategoryState } from '@/context/filters/CategoryFilterContextOptimized';
import SearchInput from '../../Navigation/SearchInput';
import {
  SignInButton,
  useAuth as useClerkAuth,
  UserButton,
} from '@clerk/nextjs';
import UserAccountButton from '@/components/buttons/UserAccountButton';
import WishlistModal from '@/components/Feedback/Modals/WishlistProductsModal';

const DesktopNavigation = memo(({ onCategoryClick }) => (
  <nav className="justify-center space-x-8 lg:flex">
    <HeaderButton onClick={() => onCategoryClick(null)} text="Todos" />
    <HeaderButton onClick={() => onCategoryClick('Salud')} text="Salud" />
    <HeaderButton
      onClick={() => onCategoryClick('Novedades')}
      text="Novedades"
    />
    <HeaderButton onClick={() => onCategoryClick('Ofertas')} text="Ofertas" />
  </nav>
));
DesktopNavigation.displayName = 'DesktopNavigation';

const TopBanner = memo(() => (
  <div className="relative overflow-hidden bg-gray-800 py-2">
    <div className="animate-marquee text-center text-xs whitespace-nowrap text-gray-300 md:text-sm">
      {Array.from({ length: 8 }).map((_, index) => (
        <span key={index} className="mx-4">
          {generalTextData.header.banner}
        </span>
      ))}
    </div>
  </div>
));
TopBanner.displayName = 'TopBanner';

const UserActions = memo(
  ({
    toggleCart,
    totalItems,
    onWishlistClick,
  }) => (
    <div className="flex items-center space-x-5">
      <SearchInput className="lg:block" />

      <div className="flex items-center space-x-5">
        {/* Cuenta */}
        <div className="flex flex-col items-center gap-1">
          <UserAccountButton />
          <span className="text-xs text-gray-400">Cuenta</span>
        </div>

        {/* Wishlist */}
        <div className="flex flex-col items-center gap-1">
          <button
            className="cursor-pointer rounded text-gray-300 transition hover:text-white"
            onClick={onWishlistClick}
          >
            <HeartIcon className="transition-all duration-300 ease-in-out hover:fill-red-500" />
          </button>
          <span className="text-xs text-gray-400">Wishlist</span>
        </div>

        {/* Carrito */}
        <div className="flex flex-col items-center">
          <button
            onClick={toggleCart}
            className="relative cursor-pointer rounded text-gray-300 transition hover:text-white"
            aria-label="Abrir carrito"
          >
            <ShoppingCartIconNew className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
          <span className="text-xs text-gray-400">Carrito</span>
        </div>
      </div>
    </div>
  )
);
UserActions.displayName = 'UserActions';

function MainHeader() {
  const router = useRouter();
  const { setCategory } = useCategoryState('all-products');
  const { toggleCart } = useCartToggle();
  const { totalItems } = useCartTotals();

  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);

  const handleCategoryClick = useCallback(
    (category) => {
      setCategory(category);
      router.push('/all-products');
    },
    [setCategory, router]
  );

  const handleLoginClick = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  let clerkAuth = { isSignedIn: false };
  let UserButtonComponent = null;
  let SignInButtonComponent = null;

  try {
    clerkAuth = useClerkAuth();
    UserButtonComponent = UserButton;
    SignInButtonComponent = SignInButton;
  } catch (error) {
    console.warn('Clerk auth not available in MainHeader:', error.message);
  }

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (clerkAuth.isSignedIn !== undefined) {
      setIsLoggedIn(clerkAuth.isSignedIn);
    }
  }, [clerkAuth.isSignedIn, setIsLoggedIn]);

  return (
    <>
      <TopBanner />

      <header className="sticky top-0 z-50 hidden border-b border-gray-700 bg-gray-900 px-20 lg:block">
        <div className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center justify-between pl-5">
          <LogoButton />
          <DesktopNavigation onCategoryClick={handleCategoryClick} />
          <UserActions
            isLoggedIn={isLoggedIn}
            UserButtonComponent={UserButtonComponent}
            SignInButtonComponent={SignInButtonComponent}
            toggleCart={toggleCart}
            totalItems={totalItems}
            onLoginClick={handleLoginClick}
            onWishlistClick={() => setWishlistModalOpen(true)}
          />
        </div>
      </header>

      {/* Modal de wishlist */}
      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
      />
    </>
  );
}

export default memo(MainHeader);
