'use client';

import React, { memo, useCallback, useEffect } from 'react';
import generalTextData from '@/data/generalText/generalTextData';
import LogoButton from '../../buttons/header/LogoButton';
import HeaderButton from '../../buttons/header/HeaderButton';
import { ShoppingBagIcon, UserIcon, UsersIcon } from '../../icons/Icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth/AuthContextOptimized';
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
import OrdersModalTrigger from '@/components/buttons/OrdersModalTrigger';

// Componente memoizado para la navegación desktop
const DesktopNavigation = memo(({ onCategoryClick }) => (
  <nav className="hidden justify-center space-x-8 lg:flex">
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

// Componente memoizado para el banner superior
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

// Componente memoizado para los iconos de usuario
const UserActions = memo(
  ({
    isLoggedIn,
    UserButtonComponent,
    SignInButtonComponent,
    toggleCart,
    totalItems,
    onLoginClick,
  }) => (
    <div className="flex items-center space-x-4">
      <SearchInput className="hidden lg:block" />
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            <OrdersModalTrigger showIcon={false} styles="" />
            {UserButtonComponent && <UserButtonComponent />}
          </>
        ) : (
          <>
            {SignInButtonComponent ? (
              <SignInButtonComponent mode="modal">
                <button className="cursor-pointer rounded px-4 py-2 text-gray-300 transition hover:text-white">
                  <UserIcon />
                </button>
              </SignInButtonComponent>
            ) : (
              <button
                onClick={onLoginClick}
                className="cursor-pointer rounded px-4 py-2 text-gray-300 transition hover:text-white"
              >
                <UserIcon />
              </button>
            )}
          </>
        )}

        <button
          onClick={toggleCart}
          className="relative rounded cursor-pointer p-2 text-gray-300 transition hover:text-white"
          aria-label="Abrir carrito"
        >
          <ShoppingBagIcon className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>
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

  // Safe Clerk integration fallback
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

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 hidden border-b border-gray-700 bg-gray-900 px-4 lg:block">
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
          />
        </div>
      </header>

      {/* Mobile Header */}
      {/* <header className="sticky top-0 z-50 block border-b border-gray-700 bg-gray-900 lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <LogoButton />
          <UserActions
            isLoggedIn={isLoggedIn}
            UserButtonComponent={UserButtonComponent}
            SignInButtonComponent={SignInButtonComponent}
            toggleCart={toggleCart}
            totalItems={totalItems}
            onLoginClick={handleLoginClick}
          />
        </div>
      </header> */}
    </>
  );
}

export default memo(MainHeader);
