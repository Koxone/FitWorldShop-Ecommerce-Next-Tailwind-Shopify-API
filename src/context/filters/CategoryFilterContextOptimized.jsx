'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import useShopifyProducts from '@/hooks/useShopifyProducts';

const CategoryFilterContext = createContext();

export const CategoryFilterProvider = ({ children }) => {
  // Estados separados por vista
  const [homeCategory, setHomeCategory] = useState(null);
  const [allProductsCategory, setAllProductsCategory] = useState(null);
  const [productOpenCategory, setProductOpenCategory] = useState(null);
  const [suplementsCategory, setSuplementsCategory] = useState(null);
  const [vitaminsCategory, setVitaminsCategory] = useState(null);
  const [ropaCategory, setRopaCategory] = useState(null);
  const [offersCategory, setOffersCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [accesoriesCategory, setAccesoriesCategory] = useState(null);
  const [saludCategory, setSaludCategory] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  const { products, isLoading, isError } = useShopifyProducts();

  // Devuelve el estado correspondiente a cada vista - memoized to prevent re-creation
  const getScopeState = useCallback(
    (scope) => {
      switch (scope) {
        case 'home':
          return {
            currentCategory: homeCategory,
            setCategory: setHomeCategory,
          };
        case 'all-products':
          return {
            currentCategory: allProductsCategory,
            setCategory: setAllProductsCategory,
          };
        case 'product-open':
          return {
            currentCategory: productOpenCategory,
            setCategory: setProductOpenCategory,
          };
        case 'supplements':
          return {
            currentCategory: suplementsCategory,
            setCategory: setSuplementsCategory,
          };
        case 'vitamins':
          return {
            currentCategory: vitaminsCategory,
            setCategory: setVitaminsCategory,
          };
        case 'salud':
          return {
            currentCategory: saludCategory,
            setCategory: setSaludCategory,
          };
        case 'ropa':
          return {
            currentCategory: ropaCategory,
            setCategory: setRopaCategory,
          };
        case 'offers':
          return {
            currentCategory: offersCategory,
            setCategory: setOffersCategory,
          };
        case 'new':
          return {
            currentCategory: newCategory,
            setCategory: setNewCategory,
          };
        case 'accesories':
          return {
            currentCategory: accesoriesCategory,
            setCategory: setAccesoriesCategory,
          };
        default:
          return { currentCategory: null, setCategory: () => {} };
      }
    },
    [
      homeCategory,
      allProductsCategory,
      productOpenCategory,
      suplementsCategory,
      vitaminsCategory,
      ropaCategory,
      offersCategory,
      newCategory,
      accesoriesCategory,
      saludCategory,
    ]
  );

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
      Leggings: 'legging',
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
      if (!query.trim()) return products;

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

  // Filter products by category - memoized
  const filterProductsByCategory = useCallback(
    (category) => {
      if (!category || category === 'Todos') return products;

      const categoryTag = mapTextToShopifyCategory(category);
      if (!categoryTag) return products;

      return products.filter((product) => {
        const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
        return tags.includes(categoryTag.toLowerCase());
      });
    },
    [products, mapTextToShopifyCategory]
  );

  // Combined search and filter - memoized
  const getFilteredProducts = useCallback(
    (category, query = '') => {
      let filtered = products;

      // Apply category filter first
      if (category && category !== 'Todos') {
        filtered = filterProductsByCategory(category);
      }

      // Apply search filter
      if (query.trim()) {
        const searchTerm = query.toLowerCase().trim();
        filtered = filtered.filter((product) => {
          const title = product.title?.toLowerCase() || '';
          const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
          const description = product.description?.toLowerCase() || '';

          return (
            title.includes(searchTerm) ||
            tags.some((tag) => tag.includes(searchTerm)) ||
            description.includes(searchTerm)
          );
        });
      }

      return filtered;
    },
    [products, filterProductsByCategory]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State getters
      getScopeState,

      // Category mapping
      mapTextToShopifyCategory,
      categoryLabels,

      // Product data
      products,
      isLoading,
      isError,

      // Search functionality
      searchQuery,
      setSearchQuery,
      searchProducts,

      // Filter functionality
      filterProductsByCategory,
      getFilteredProducts,
    }),
    [
      getScopeState,
      mapTextToShopifyCategory,
      categoryLabels,
      products,
      isLoading,
      isError,
      searchQuery,
      searchProducts,
      filterProductsByCategory,
      getFilteredProducts,
    ]
  );

  return (
    <CategoryFilterContext.Provider value={contextValue}>
      {children}
    </CategoryFilterContext.Provider>
  );
};

export const useCategoryFilter = () => {
  const context = useContext(CategoryFilterContext);
  if (context === undefined) {
    throw new Error(
      'useCategoryFilter must be used within a CategoryFilterProvider'
    );
  }
  return context;
};

// Hooks específicos para reducir re-renders
export const useCategoryState = (scope) => {
  const { getScopeState } = useCategoryFilter();
  return getScopeState(scope);
};

export const useProductSearch = () => {
  const { searchQuery, setSearchQuery, searchProducts } = useCategoryFilter();
  return { searchQuery, setSearchQuery, searchProducts };
};

export const useProductFilters = () => {
  const { filterProductsByCategory, getFilteredProducts, categoryLabels } =
    useCategoryFilter();
  return { filterProductsByCategory, getFilteredProducts, categoryLabels };
};

export const useProducts = () => {
  const { products, isLoading, isError } = useCategoryFilter();
  return { products, isLoading, isError };
};
