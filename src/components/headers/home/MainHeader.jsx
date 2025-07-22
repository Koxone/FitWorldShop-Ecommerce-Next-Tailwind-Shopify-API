'use client';

import generalTextData from '@/data/generalText/generalTextData';
import LogoButton from '../../buttons/header/LogoButton';
import HeaderButton from '../../buttons/header/HeaderButton';
import { ShoppingBagIcon, UserIcon } from '../../icons/Icons';
import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '../../../context/filters/CategoryFilterContext';
import { usePurchase } from '@/context/Cart/PurchaseContext';
import { useAuth } from '@/context/Auth/AuthContext';
import SearchInput from '../../Navigation/SearchInput';
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

  const { cartItems, isCartOpen, setIsCartOpen } = usePurchase();

  return (
    <>
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-surface py-2">
        <div className="animate-marquee text-center text-xs whitespace-nowrap text-secondary md:text-sm font-sans">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="mx-4">
              {generalTextData.header.banner}
            </span>
          ))}
        </div>
      </div>

      {/* Desktop Header */}
      <header className="sticky top-0 z-fixed hidden border-b border-border bg-surface-elevated px-4 lg:block shadow-sm">
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

          {/* Right Side - Search + Icons */}
          <div className="flex items-center justify-end space-x-4">
            {/* Search Input */}
            <SearchInput />

            {/* Auth Button */}
            <div className="relative flex items-center justify-center">
              {isLoggedIn && UserButtonComponent ? (
                <UserButtonComponent
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
              ) : SignInButtonComponent ? (
                <SignInButtonComponent>
                  <button className="absolute inset-0 lg:pl-4 -top-4.5 -left-5 z-0 cursor-pointer p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal">
                    <UserIcon size={20} />
                  </button>
                </SignInButtonComponent>
              ) : (
                <button
                  onClick={() => router.push('/auth/login')}
                  className="absolute inset-0 -top-4.5 -left-5 z-0 cursor-pointer p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal"
                >
                  <UserIcon size={20} />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative cursor-pointer p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal"
            >
              <ShoppingBagIcon size={20} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-inverse">
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 hidden z-50 border-b border-border bg-surface-elevated px-4 py-3 lg:hidden shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LogoButton />

          {/* Right Icons - Cart and Auth */}
          <div className="flex items-center space-x-3">
            {/* Auth Button */}
            <div className="relative flex items-center justify-center">
              {isLoggedIn && UserButtonComponent ? (
                <UserButtonComponent
                  afterSignInUrl="/user-profile"
                  afterSignOutUrl="/"
                  className="z-10 h-7 w-7 overflow-hidden rounded-full"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        'h-7 w-7 rounded-full overflow-hidden',
                    },
                  }}
                />
              ) : SignInButtonComponent ? (
                <SignInButtonComponent>
                  <button className="cursor-pointer p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal">
                    <UserIcon size={18} />
                  </button>
                </SignInButtonComponent>
              ) : (
                <button
                  onClick={() => router.push('/auth/login')}
                  className="cursor-pointer p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal"
                >
                  <UserIcon size={18} />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative cursor-pointer p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal"
            >
              <ShoppingBagIcon size={18} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-inverse">
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
