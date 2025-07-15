'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import useShopifyProducts from '@/hooks/useShopifyProducts';

const CategoryFilterContext = createContext();

export const CategoryFilterProvider = ({ children }) => {
  const pathname = usePathname();
  const [homeCategory, setHomeCategory] = useState(null);
  const [allProductsCategory, setAllProductsCategory] = useState(null);
  const [productOpenCategory, setProductOpenCategory] = useState(null);

  const { products, isLoading, isError } = useShopifyProducts();

  const { currentCategory, setCategory } = useMemo(() => {
    if (pathname === '/') {
      return { currentCategory: homeCategory, setCategory: setHomeCategory };
    } else if (pathname.startsWith('/all-products')) {
      return {
        currentCategory: allProductsCategory,
        setCategory: setAllProductsCategory,
      };
    } else {
      return {
        currentCategory: productOpenCategory,
        setCategory: setProductOpenCategory,
      };
    }
  }, [pathname, homeCategory, allProductsCategory, productOpenCategory]);

  // Mapeo de etiquetas desde categorías legibles
  const labelToTagMap = {
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
    Jogger: 'jogger',
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

  const mapTextToShopifyCategory = (text) => {
    return labelToTagMap[text] ?? null;
  };

  const tag = labelToTagMap[currentCategory];
  const filteredProducts =
    tag === null || !tag
      ? products
      : products?.filter((product) =>
          product.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
        );

  return (
    <CategoryFilterContext.Provider
      value={{
        currentCategory,
        setCategory,
        filteredProducts,
        isLoading,
        isError,
        mapTextToShopifyCategory,
        categoryLabels,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export const useCategoryFilter = () => useContext(CategoryFilterContext);
