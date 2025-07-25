'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContextOptimized';

export default function SearchInput({ className = '' }) {
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { searchQuery, setSearchQuery, searchProducts } = useCategoryFilter();
  const router = useRouter();
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (inputValue.trim()) {
        const results = searchProducts(inputValue);
        setSearchResults(results.slice(0, 5)); // Show only first 5 results
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, searchProducts]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
      setShowResults(false);
      router.push('/all-products');
    }
  };

  // Handle result click
  const handleResultClick = (product) => {
    setInputValue('');
    setShowResults(false);
    setIsVisible(false);
    router.push(`/product-open/${product.handle}`);
  };

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Button (Mobile/Desktop toggle) */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center justify-center p-2 text-gray-300 transition-colors hover:text-white lg:hidden"
        aria-label="Abrir búsqueda"
      >
        <svg
          className="h-5 w-5"
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
      </button>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className={`${
          isVisible ? 'block' : 'hidden'
        } absolute top-full right-0 left-0 z-50 rounded-lg border border-gray-600 bg-gray-800 p-2 lg:relative lg:top-0 lg:right-auto lg:left-auto lg:block lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none lg:w-64 xl:w-80"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-400 hover:text-white"
          >
            <svg
              className="h-4 w-4"
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
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div
            ref={resultsRef}
            className="absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-gray-600 bg-gray-800 shadow-lg"
          >
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleResultClick(product)}
                className="flex w-full items-center border-b border-gray-700 p-3 text-left transition-colors last:border-b-0 hover:bg-gray-700"
              >
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="mr-3 h-10 w-10 flex-shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {product.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    ${product.priceRange.minVariantPrice.amount}
                  </p>
                </div>
              </button>
            ))}
            <button
              onClick={() => {
                setSearchQuery(inputValue);
                setShowResults(false);
                router.push('/all-products');
              }}
              className="w-full border-t border-gray-600 p-3 text-center text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              Ver todos los resultados (
              {searchResults.length > 5 ? 'más de 5' : searchResults.length})
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
