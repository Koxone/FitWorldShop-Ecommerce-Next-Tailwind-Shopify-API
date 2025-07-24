'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import generalTextData from '@/data/generalText/generalTextData';
import LogoButton from '../../buttons/header/LogoButton';
import HeaderButton from '../../buttons/header/HeaderButton';
import { ShoppingBagIcon, UserIcon } from '../../icons/Icons';
import { usePurchase } from '@/context/Cart/PurchaseContext';
import { useAuth } from '@/context/Auth/AuthContext';
import OptimizedSearchInput from '../../Navigation/OptimizedSearchInput';
import OrdersModalTrigger from '@/components/buttons/OrdersModalTrigger';
import { useProductData } from '@/context/filters/ProductDataContext';
import { useRenderTracker } from '@/hooks/useRenderTracker';

// Memoized header button component to prevent unnecessary re-renders
const MemoizedHeaderButton = memo(({ onClick, text }) => (
  <HeaderButton onClick={onClick} text={text} />
));

// Optimized MainHeader with minimal context dependencies
function MainHeader() {
  useRenderTracker('OptimizedMainHeader');
  
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { cartItems, isCartOpen, setIsCartOpen } = usePurchase();
  const { mapTextToShopifyCategory } = useProductData();
  const [clerkComponents, setClerkComponents] = useState({ SignInButton: null, UserButton: null });
  const [isClerkAvailable, setIsClerkAvailable] = useState(false);

  // Optimized click handler that doesn't depend on context state
  const handleClick = useCallback((category) => {
    // Navigate to all-products and let that page handle the category filtering
    const params = new URLSearchParams();
    if (category) {
      const mappedCategory = mapTextToShopifyCategory(category);
      if (mappedCategory) {
        params.set('category', mappedCategory);
      }
    }
    
    const url = `/all-products${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url);
  }, [router, mapTextToShopifyCategory]);

  // Check if Clerk is available and load components safely
  useEffect(() => {
    const checkClerkAvailability = () => {
      const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      const hasValidClerkKey =
        clerkPublishableKey &&
        clerkPublishableKey.startsWith('pk_') &&
        !clerkPublishableKey.includes('dummy');
      
      return hasValidClerkKey;
    };

    const loadClerkComponents = async () => {
      try {
        // Only load Clerk components if Clerk is properly configured
        if (checkClerkAvailability()) {
          const { SignInButton, UserButton } = await import('@clerk/nextjs');
          setClerkComponents({ SignInButton, UserButton });
          setIsClerkAvailable(true);
        } else {
          setIsClerkAvailable(false);
        }
      } catch (error) {
        console.warn('Clerk components not available:', error);
        setIsClerkAvailable(false);
      }
    };
    
    loadClerkComponents();
  }, []);

  // Memoized cart button toggle
  const toggleCart = useCallback(() => {
    setIsCartOpen(!isCartOpen);
  }, [isCartOpen, setIsCartOpen]);

  // Memoized auth handler
  const handleAuthClick = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

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

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 hidden border-b border-gray-700 bg-gray-900 px-4 lg:block">
        <div className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center justify-between pl-5">
          {/* Logo */}
          <LogoButton />

          {/* Desktop Navigation Buttons */}
          <nav className="hidden justify-center space-x-8 lg:flex">
            <MemoizedHeaderButton onClick={() => handleClick(null)} text="Todos" />
            <MemoizedHeaderButton onClick={() => handleClick('Salud')} text="Salud" />
            <MemoizedHeaderButton onClick={() => handleClick('Novedades')} text="Novedades" />
            <MemoizedHeaderButton onClick={() => handleClick('Ofertas')} text="Ofertas" />
            <OrdersModalTrigger
              showIcon={false}
              styles="font-poppins hover-lift cursor-pointer font-semibold tracking-wide text-gray-300 uppercase transition-all duration-300 hover:scale-125 hover:text-white"
            />
          </nav>

          {/* Right Side - Search + Icons */}
          <div className="flex items-center justify-end space-x-6">
            {/* Search Input */}
            <OptimizedSearchInput />

            {/* Auth Button */}
            <div className="relative flex items-center justify-center">
              {isClerkAvailable && isLoggedIn && clerkComponents.UserButton ? (
                <clerkComponents.UserButton
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
              ) : isClerkAvailable && !isLoggedIn && clerkComponents.SignInButton ? (
                <clerkComponents.SignInButton>
                  <button className="absolute inset-0 -top-4.5 -left-5 z-0 cursor-pointer p-2 text-gray-300 hover:text-white lg:pl-4">
                    <UserIcon size={20} />
                  </button>
                </clerkComponents.SignInButton>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="absolute inset-0 -top-4.5 -left-5 z-0 cursor-pointer p-2 text-gray-300 hover:text-white"
                >
                  <UserIcon size={20} />
                </button>
              )}
            </div>

            <button
              onClick={toggleCart}
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

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 hidden border-b border-gray-700 bg-gray-900 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LogoButton />

          {/* Right Icons - Cart and Auth */}
          <div className="flex items-center space-x-4">
            {/* Auth Button */}
            <div className="relative flex items-center justify-center">
              {isClerkAvailable && isLoggedIn && clerkComponents.UserButton ? (
                <clerkComponents.UserButton
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
              ) : isClerkAvailable && !isLoggedIn && clerkComponents.SignInButton ? (
                <clerkComponents.SignInButton>
                  <button className="cursor-pointer p-2 text-gray-300 hover:text-white">
                    <UserIcon size={18} />
                  </button>
                </clerkComponents.SignInButton>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="cursor-pointer p-2 text-gray-300 hover:text-white"
                >
                  <UserIcon size={18} />
                </button>
              )}
            </div>

            <button
              onClick={toggleCart}
              className="relative cursor-pointer p-2 text-gray-300 hover:text-white"
            >
              <ShoppingBagIcon size={18} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-900">
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(MainHeader);