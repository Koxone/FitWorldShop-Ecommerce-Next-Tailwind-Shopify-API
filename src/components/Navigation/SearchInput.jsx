'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';

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

  // Debounced search effect
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
        className="flex items-center justify-center p-2 text-muted hover:text-text hover:text-primary transition-colors duration-normal lg:hidden"
        aria-label="Abrir búsqueda"
      >
        <svg
          className="w-5 h-5"
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
        } lg:block absolute lg:relative top-full lg:top-0 left-0 right-0 lg:left-auto lg:right-auto bg-surface lg:bg-transparent border lg:border-0 border-border rounded-lg lg:rounded-none p-2 lg:p-0 z-50 shadow-lg lg:shadow-none`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full lg:w-64 xl:w-80 px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all duration-normal font-sans"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors duration-normal"
          >
            <svg
              className="w-4 h-4"
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
            className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-xl max-h-80 overflow-y-auto z-50"
          >
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleResultClick(product)}
                className="w-full flex items-center p-3 hover:bg-surface-hover transition-colors duration-normal text-left border-b border-border last:border-b-0"
              >
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded mr-3 flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-text text-sm font-medium truncate font-sans">
                    {product.title}
                  </p>
                  <p className="text-muted text-xs font-sans">
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
              className="w-full p-3 text-center text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-normal border-t border-border font-sans"
            >
              Ver todos los resultados ({searchResults.length > 5 ? 'más de 5' : searchResults.length})
            </button>
          </div>
        )}
      </form>
    </div>
  );
}