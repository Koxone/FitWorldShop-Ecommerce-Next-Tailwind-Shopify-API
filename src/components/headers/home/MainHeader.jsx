'use client';

import generalTextData from '@/data/generalText/generalTextData';
import LogoButton from '../../buttons/header/LogoButton';
import HeaderButton from '../../buttons/header/HeaderButton';
import { ShoppingBagIcon, UserIcon } from '../../icons/Icons';
import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '../../../context/filters/CategoryFilterContext';
import { usePurchase } from '@/context/Cart/PurchaseContext';
import { useAuth } from '@/context/Auth/AuthContext';
import {
  SignInButton,
  useAuth as useClerkAuth,
  UserButton,
} from '@clerk/nextjs';
import { useEffect } from 'react';

function MainHeader() {
  const router = useRouter();
  const { getScopeState } = useCategoryFilter();
  const { setCategory } = getScopeState('all-products');

  const handleClick = (category) => {
    setCategory(category);
    router.push('/all-products');
  };

  const { isSignedIn } = useClerkAuth();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  useEffect(() => {
    setIsLoggedIn(isSignedIn);
  }, [isSignedIn, setIsLoggedIn]);

  // const handleAuthClick = () => {
  //   if (!isLoggedIn) {
  //     router.push('/auth/login');
  //   }
  // };

  const { cartItems, isCartOpen, setIsCartOpen } = usePurchase();

  return (
    <>
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gray-800 py-2">
        <div className="animate-marquee text-center text-xs whitespace-nowrap text-gray-300 md:text-sm">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="mx-4">
              {generalTextData.header.banner}
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 hidden border-b border-gray-700 bg-gray-900 px-4 lg:block">
        <div className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center justify-between pl-5">
          {/* Logo */}
          <LogoButton />

          {/* Desktop Navigation Buttons */}
          <nav className="hidden justify-center space-x-8 lg:flex">
            <HeaderButton onClick={() => handleClick(null)} text="Todos" />
            <HeaderButton onClick={() => handleClick('Ropa')} text="Moda" />
            <HeaderButton onClick={() => handleClick('Salud')} text="Salud" />
            <HeaderButton
              onClick={() => handleClick('Novedades')}
              text="Novedades"
            />
            <HeaderButton
              onClick={() => handleClick('Ofertas')}
              text="Ofertas"
            />
          </nav>

          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-4">
            {/* Auth Button */}
            <div className="relative flex items-center justify-center">
              {isLoggedIn ? (
                <UserButton
                  afterSignInUrl="/user-profile"
                  afterSignOutUrl="/"
                  className="z-10 h-8 w-8 overflow-hidden rounded-full"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        'h-8 w-8 rounded-full overflow-hidden',
                    },
                  }}
                />
              ) : (
                <SignInButton>
                  <button
                    // onClick={handleAuthClick}
                    className="absolute inset-0 -top-4.5 -left-5 z-0 cursor-pointer p-2 text-gray-300 hover:text-white"
                  >
                    <UserIcon size={20} />
                  </button>
                </SignInButton>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative cursor-pointer p-2 text-gray-300 hover:text-white"
            >
              <ShoppingBagIcon size={20} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-900">
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
