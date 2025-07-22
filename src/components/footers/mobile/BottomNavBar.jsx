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
import { useState, useEffect, useRef } from 'react';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';

function BottomNavBar() {
  const isPWA = useIsPWA();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsCartOpen } = usePurchase();
  const { setSearchQuery, searchProducts } = useCategoryFilter();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debounceRef = useRef(null);
  
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

  // Debounced search effect for real-time filtering
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (mobileSearchValue.trim()) {
        const results = searchProducts(mobileSearchValue);
        setSearchResults(results.slice(0, 10)); // Show up to 10 results
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [mobileSearchValue, searchProducts]);

  // Handle mobile search input change
  const handleMobileSearchInputChange = (e) => {
    setMobileSearchValue(e.target.value);
  };

  // Handle search result click
  const handleSearchResultClick = (product) => {
    setMobileSearchValue('');
    setSearchResults([]);
    setShowMobileSearch(false);
    router.push(`/product-open/${product.handle}`);
  };

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
                onClick={() => {
                  setShowMobileSearch(false);
                  setMobileSearchValue('');
                  setSearchResults([]);
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search Input */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  value={mobileSearchValue}
                  onChange={handleMobileSearchInputChange}
                  placeholder="¿Qué estás buscando?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Busca por nombre de producto, categoría o tags
              </p>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {mobileSearchValue.trim() && searchResults.length > 0 && (
                <div className="p-4">
                  <p className="text-sm text-gray-400 mb-4">
                    {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="w-full flex items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left border border-gray-700"
                      >
                        {product.featuredImage && (
                          <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {product.title}
                          </p>
                          <p className="text-blue-400 text-sm font-semibold">
                            ${product.priceRange.minVariantPrice.amount}
                          </p>
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* View All Results Button */}
                  {mobileSearchValue.trim() && (
                    <button
                      onClick={() => {
                        setSearchQuery(mobileSearchValue);
                        setShowMobileSearch(false);
                        setMobileSearchValue('');
                        setSearchResults([]);
                        router.push('/all-products');
                      }}
                      className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Ver todos los resultados
                    </button>
                  )}
                </div>
              )}
              
              {/* No Results */}
              {mobileSearchValue.trim() && searchResults.length === 0 && (
                <div className="p-4 text-center">
                  <p className="text-gray-400">No se encontraron productos</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              )}
              
              {/* Empty State */}
              {!mobileSearchValue.trim() && (
                <div className="p-4 text-center">
                  <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">¿Qué estás buscando?</p>
                  <p className="text-sm text-gray-500">
                    Escribe para ver resultados en tiempo real
                  </p>
                </div>
              )}
            </div>
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
