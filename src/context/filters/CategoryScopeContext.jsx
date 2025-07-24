'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

const CategoryScopeContext = createContext();

export const CategoryScopeProvider = ({ children, scope }) => {
  const [currentCategory, setCurrentCategory] = useState(null);

  // Memoize the setCategory function to prevent recreation
  const setCategory = useCallback((category) => {
    setCurrentCategory(category);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      currentCategory,
      setCategory,
      scope,
    }),
    [currentCategory, setCategory, scope]
  );

  return (
    <CategoryScopeContext.Provider value={contextValue}>
      {children}
    </CategoryScopeContext.Provider>
  );
};

export const useCategoryScope = () => {
  const context = useContext(CategoryScopeContext);
  if (!context) {
    throw new Error('useCategoryScope must be used within CategoryScopeProvider');
  }
  return context;
};