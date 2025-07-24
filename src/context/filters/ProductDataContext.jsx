'use client';

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import useShopifyProducts from '@/hooks/useShopifyProducts';

const ProductDataContext = createContext();

export const ProductDataProvider = ({ children }) => {
  const { products, isLoading, isError } = useShopifyProducts();

  // Static mapping - memoized to prevent re-creation
  const labelToTagMap = useMemo(
    () => ({
      Vitaminas: 'vitaminas',
      Suplementos: 'Suplementos',
      Salud: 'Salud',
      Ropa: 'Ropa',
      Todos: null,
      Mujer: 'women',
      Hombre: 'men',
      Accesorios: 'accesories',
      Bodysuit: 'bodysuit',
      Bras: 'bras',
      Mochilas: 'bags',
      Gorras: 'hats',
      Calcetines: 'socks',
      Crops: 'crops',
      Hoodies: 'hoodies',
      Pants: 'jogger',
      Leggings: 'leggings',
      Novedades: 'new',
      Ofertas: 'sale',
      Playeras: 'shirts',
      Shorts: 'shorts',
      Sudaderas: 'jacket',
      Tanks: 'tanks',
      Tops: 'tops',
      Underware: 'underware',
      Lipoblue: 'lipoblue',
    }),
    []
  );

  const categoryLabels = useMemo(
    () => Object.keys(labelToTagMap),
    [labelToTagMap]
  );

  const mapTextToShopifyCategory = useCallback(
    (text) => labelToTagMap[text] ?? null,
    [labelToTagMap]
  );

  // Search function to filter products by title and tags - memoized to prevent re-creation
  const searchProducts = useCallback(
    (query) => {
      if (!query.trim() || !products) return products || [];

      const searchTerm = query.toLowerCase().trim();
      return products.filter((product) => {
        const title = product.title?.toLowerCase() || '';
        const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
        const description = product.description?.toLowerCase() || '';

        return (
          title.includes(searchTerm) ||
          tags.some((tag) => tag.includes(searchTerm)) ||
          description.includes(searchTerm)
        );
      });
    },
    [products]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      products: products || [],
      isLoading,
      isError,
      mapTextToShopifyCategory,
      categoryLabels,
      searchProducts,
    }),
    [
      products,
      isLoading,
      isError,
      mapTextToShopifyCategory,
      categoryLabels,
      searchProducts,
    ]
  );

  return (
    <ProductDataContext.Provider value={contextValue}>
      {children}
    </ProductDataContext.Provider>
  );
};

export const useProductData = () => {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error('useProductData must be used within ProductDataProvider');
  }
  return context;
};