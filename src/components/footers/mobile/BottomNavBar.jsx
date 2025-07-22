'use client';

import useIsPWA from '@/hooks/useIsPWA';
import {
  HomeIcon,
  MenuIcon,
  ShoppingBagIcon,
  UserIcon,
} from '../../icons/Icons';
import { useRouter, usePathname } from 'next/navigation';
import { usePurchase } from '@/context/Cart/PurchaseContext';

function BottomNavBar() {
  const isPWA = useIsPWA();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsCartOpen } = usePurchase();
  
  // Safely get auth state, fallback to false if Clerk is not properly configured
  let isSignedIn = false;
  try {
    const { useAuth } = require('@clerk/nextjs');
    const auth = useAuth();
    isSignedIn = auth?.isSignedIn || false;
  } catch (error) {
    // Clerk not properly configured, continue with isSignedIn = false
    console.warn('Clerk auth not available:', error.message);
  }

  if (isPWA === null) return null;

  const items = [
    { 
      icon: HomeIcon, 
      label: 'Home', 
      path: '/',
      action: () => router.push('/')
    },
    { 
      icon: UserIcon, 
      label: 'Cuenta', 
      path: '/user-profile',
      action: () => {
        if (isSignedIn) {
          router.push('/user-profile');
        } else {
          router.push('/auth/login');
        }
      }
    },
    { 
      icon: ShoppingBagIcon, 
      label: 'Carrito', 
      path: '/cart',
      action: () => setIsCartOpen(true)
    },
    { 
      icon: MenuIcon, 
      label: 'Menu', 
      path: '/menu',
      action: () => router.push('/menu')
    },
  ];

  const isActive = (item) => {
    if (item.label === 'Home') {
      return pathname === '/';
    }
    if (item.label === 'Carrito') {
      // Cart doesn't have a dedicated page, so never active
      return false;
    }
    return pathname.startsWith(item.path);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 flex h-[70px] w-full justify-between border-t border-gray-700 bg-[#101833] px-10 pt-2 ${
        isPWA ? 'pb-20' : 'pb-8'
      } text-white lg:hidden`}
    >
      {items.map((item, index) => {
        const { icon: Icon, label, action } = item;
        const active = isActive(item);
        
        return (
          <button
            key={index}
            onClick={action}
            className={`flex h-fit w-fit cursor-pointer flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
              active 
                ? 'text-blue-400 scale-105' 
                : 'text-white hover:text-blue-400 hover:scale-105'
            }`}
          >
            <Icon className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
            <span className={`transition-colors duration-200 ${active ? 'font-semibold' : ''}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNavBar;
