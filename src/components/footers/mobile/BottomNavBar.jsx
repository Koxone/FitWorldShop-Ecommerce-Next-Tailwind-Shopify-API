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
import MobileMenu from '@/components/Navigation/AllProducts/MobileMenu';
import UserAccountButton from '@/components/buttons/UserAccountButton';

function BottomNavBar() {
  const isPWA = useIsPWA();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsCartOpen } = usePurchase();
  const { setSearchQuery, searchProducts } = useCategoryFilter();

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const debounceRef = useRef(null);

  const SearchIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const items = [
    {
      icon: HomeIcon,
      label: 'Home',
      path: '/',
      action: () => router.push('/'),
    },
    {
      icon: SearchIcon,
      label: 'Buscar',
      path: '/search',
      action: () => setShowMobileSearch(true),
    },
    {
      icon: UserIcon,
      label: 'Cuenta',
      path: '/user-profile',
      action: () => router.push('/auth/login'),
    },
    {
      icon: ShoppingBagIcon,
      label: 'Carrito',
      path: '/cart',
      action: () => setIsCartOpen(true),
    },
    {
      icon: MenuIcon,
      label: 'Menu',
      path: '/menu',
      action: () => setShowMobileMenu((prev) => !prev),
    },
  ];

  const isActive = (item) => {
    if (item.label === 'Home') return pathname === '/';
    if (item.label === 'Carrito') return false;
    if (item.label === 'Buscar') return showMobileSearch;
    return pathname.startsWith(item.path);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (mobileSearchValue.trim()) {
        const results = searchProducts(mobileSearchValue);
        setSearchResults(results.slice(0, 10));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [mobileSearchValue, searchProducts]);

  if (isPWA === null) return null;

  const handleMobileSearchInputChange = (e) => {
    setMobileSearchValue(e.target.value);
  };

  const handleSearchResultClick = (product) => {
    setMobileSearchValue('');
    setSearchResults([]);
    setShowMobileSearch(false);
    router.push(`/product-open/${product.handle}`);
  };

  return (
    <>
      {/* Search Panel */}
      {showMobileSearch && (
        <div className="bg-opacity-50 fixed inset-0 z-50 bg-black lg:hidden">
          <div className="flex h-full flex-col bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
              <h2 className="text-lg font-semibold text-white">
                Buscar Productos
              </h2>
              <button
                onClick={() => {
                  setShowMobileSearch(false);
                  setMobileSearchValue('');
                  setSearchResults([]);
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="border-b border-gray-700 p-4">
              <div className="relative">
                <input
                  type="text"
                  value={mobileSearchValue}
                  onChange={handleMobileSearchInputChange}
                  placeholder="¿Qué estás buscando?"
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
                <SearchIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Busca por nombre de producto, categoría o tags
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mobileSearchValue.trim() && searchResults.length > 0 && (
                <div className="p-4">
                  <p className="mb-4 text-sm text-gray-400">
                    {searchResults.length} resultado
                    {searchResults.length !== 1 ? 's' : ''} encontrado
                    {searchResults.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="flex w-full items-center rounded-lg border border-gray-700 bg-gray-800 p-3 text-left transition-colors hover:bg-gray-700"
                      >
                        {product.featuredImage && (
                          <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="mr-4 h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap text-white">
                            {product.title}
                          </p>
                          <p className="text-sm font-semibold text-blue-400">
                            ${product.priceRange.minVariantPrice.amount}
                          </p>
                          {product.tags && product.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {product.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300"
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
                  <button
                    onClick={() => {
                      setSearchQuery(mobileSearchValue);
                      setShowMobileSearch(false);
                      setMobileSearchValue('');
                      setSearchResults([]);
                      router.push('/all-products');
                    }}
                    className="mt-4 w-full rounded-lg bg-blue-600 p-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Ver todos los resultados
                  </button>
                </div>
              )}
              {mobileSearchValue.trim() && searchResults.length === 0 && (
                <div className="p-4 text-center">
                  <p className="text-gray-400">No se encontraron productos</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              )}
              {!mobileSearchValue.trim() && (
                <div className="p-4 text-center">
                  <SearchIcon className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                  <p className="mb-2 text-lg text-gray-400">
                    ¿Qué estás buscando?
                  </p>
                  <p className="text-sm text-gray-500">
                    Escribe para ver resultados en tiempo real
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {showMobileMenu && (
        <div className="bg-opacity-50 fixed inset-0 z-50 bg-black lg:hidden">
          <MobileMenu onClose={() => setShowMobileMenu(false)} />
        </div>
      )}

      {/* Bottom NavBar */}
      <div
        className={`fixed bottom-0 left-0 z-50 flex h-[70px] w-full justify-between border-t border-gray-700 bg-[#101833] px-6 pt-2 ${
          isPWA ? 'pb-20' : 'pb-8'
        } text-white lg:hidden`}
      >
        {items.map((item, index) => {
          const { icon: Icon, label, action } = item;
          const active = isActive(item);

          if (label === 'Cuenta') {
            return (
              <div
                key={index}
                className="flex h-fit w-fit flex-col items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center text-xs text-white">
                  <div
                    className={`flex h-fit w-fit cursor-pointer flex-col items-center justify-center gap-1 text-xs text-white transition-all duration-200 hover:scale-105 hover:text-blue-400`}
                  >
                    <UserAccountButton />
                  </div>

                  <span className="mt-1 text-xs">Cuenta</span>
                </div>
              </div>
            );
          }

          return (
            <button
              key={index}
              onClick={action}
              className={`flex h-fit w-fit cursor-pointer flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
                active
                  ? 'scale-105 text-blue-400'
                  : 'text-white hover:scale-105 hover:text-blue-400'
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : ''}`}
              />
              <span
                className={`transition-colors duration-200 ${active ? 'font-semibold' : ''}`}
              >
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
