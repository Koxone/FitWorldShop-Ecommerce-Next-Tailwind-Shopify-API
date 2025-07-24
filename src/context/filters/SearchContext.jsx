'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
    }),
    [searchQuery]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};