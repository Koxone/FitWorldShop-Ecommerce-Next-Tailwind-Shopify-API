'use client';

import { createContext, useContext, useState } from 'react';
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

  // Devuelve el estado correspondiente a cada vista
  const getScopeState = (scope) => {
    switch (scope) {
      case 'home':
        return { currentCategory: homeCategory, setCategory: setHomeCategory };
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
  };

  const labelToTagMap = {
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
  };

  const categoryLabels = Object.keys(labelToTagMap);

  const mapTextToShopifyCategory = (text) => labelToTagMap[text] ?? null;

  // Search function to filter products by title and tags
  const searchProducts = (query) => {
    if (!query.trim()) return products;
    
    const searchTerm = query.toLowerCase().trim();
    return products.filter((product) => {
      const title = product.title?.toLowerCase() || '';
      const tags = product.tags?.map(tag => tag.toLowerCase()) || [];
      const description = product.description?.toLowerCase() || '';
      
      return (
        title.includes(searchTerm) ||
        tags.some(tag => tag.includes(searchTerm)) ||
        description.includes(searchTerm)
      );
    });
  };

  return (
    <CategoryFilterContext.Provider
      value={{
        getScopeState,
        mapTextToShopifyCategory,
        categoryLabels,
        products,
        isLoading,
        isError,
        searchQuery,
        setSearchQuery,
        searchProducts,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export const useCategoryFilter = () => useContext(CategoryFilterContext);
