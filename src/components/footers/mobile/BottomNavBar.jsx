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
import { useState } from 'react';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';

function BottomNavBar() {
  const isPWA = useIsPWA();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsCartOpen } = usePurchase();
  const { setSearchQuery } = useCategoryFilter();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  
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

  // Handle mobile search
  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (mobileSearchValue.trim()) {
      setSearchQuery(mobileSearchValue);
      setShowMobileSearch(false);
      router.push('/all-products');
    }
  };

  const SearchIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const items = [
    { 
      icon: HomeIcon, 
      label: 'Home', 
      path: '/',
      action: () => router.push('/')
    },
    { 
      icon: SearchIcon, 
      label: 'Buscar', 
      path: '/search',
      action: () => setShowMobileSearch(true)
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
    if (item.label === 'Buscar') {
      // Search is active when there's a search overlay or on search-related pages
      return showMobileSearch;
    }
    return pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div className="flex h-full flex-col bg-gray-900">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Buscar Productos</h2>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleMobileSearch} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={mobileSearchValue}
                  onChange={(e) => setMobileSearchValue(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Busca por nombre de producto, categoría o tags
              </p>
            </form>
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-0 left-0 z-50 flex h-[70px] w-full justify-between border-t border-gray-700 bg-[#101833] px-6 pt-2 ${
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
    </>
  );
}

export default BottomNavBar;
