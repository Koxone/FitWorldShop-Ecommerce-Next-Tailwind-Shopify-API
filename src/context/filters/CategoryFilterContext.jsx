'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { ProductDataProvider, useProductData } from './ProductDataContext';
import { SearchProvider, useSearch } from './SearchContext';

const CategoryFilterContext = createContext();

// Optimized provider that uses separated contexts internally
const CategoryFilterProviderInternal = ({ children }) => {
  // Estados separados por vista - only create when needed
  const [categoryStates, setCategoryStates] = useState({});

  // Get scoped state for a particular view - memoized to prevent re-creation
  const getScopeState = useCallback(
    (scope) => {
      const currentCategory = categoryStates[scope] || null;
      
      const setCategory = useCallback((category) => {
        setCategoryStates(prev => ({
          ...prev,
          [scope]: category
        }));
      }, [scope]);

      return {
        currentCategory,
        setCategory,
      };
    },
    [categoryStates]
  );

  // Get product data and search from separate contexts
  const { mapTextToShopifyCategory, categoryLabels, products, isLoading, isError, searchProducts } = useProductData();
  const { searchQuery, setSearchQuery } = useSearch();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      getScopeState,
      mapTextToShopifyCategory,
      categoryLabels,
      products,
      isLoading,
      isError,
      searchQuery,
      setSearchQuery,
      searchProducts,
    }),
    [
      getScopeState,
      mapTextToShopifyCategory,
      categoryLabels,
      products,
      isLoading,
      isError,
      searchQuery,
      setSearchQuery,
      searchProducts,
    ]
  );

  return (
    <CategoryFilterContext.Provider value={contextValue}>
      {children}
    </CategoryFilterContext.Provider>
  );
};

// Main provider that wraps with necessary contexts
export const CategoryFilterProvider = ({ children }) => {
  return (
    <ProductDataProvider>
      <SearchProvider>
        <CategoryFilterProviderInternal>
          {children}
        </CategoryFilterProviderInternal>
      </SearchProvider>
    </ProductDataProvider>
  );
};

export const useCategoryFilter = () => useContext(CategoryFilterContext);
