'use client';

import { createContext, useContext, useMemo } from 'react';

const ImageSourceContext = createContext();

export function ImageSourceProvider({ children }) {
  const mainCarouselData = useMemo(() => [
    {
      image: '/promoJulio.webp',
      title: '',
      description:
        '',
      button: 'COMPRA AHORA',
    },
    {
      image:
        '/Banner/Main-Banner-2.webp',
      title: 'PRESENTAMOS PUMP',
      description:
        'Desarrollado para moldearse a tu cuerpo y mostrar tu mejor figura.',
      button: 'COMPRA AHORA',
    },
    {
      image:
        '/Banner/Main-Banner-3.webp',
      title: 'ESENCIALES DE VERANO',
      description: 'Esenciales básicos hechos para ti...',
      button: 'COMPRA AHORA',
    },
    {
      image: '/Banner/Main-Banner-4.webp',
      title: 'TODO PARA TUS ENTRENAMIENTOS',
      description: 'Encuentra todo lo que necesitas para rendir al máximo.',
      button: 'COMPRA AHORA',
    },
  ], []);

  const promoSectionData = useMemo(() => ({
    categories: [
      {
        title: 'Vitaminas',
        route: 'shirts',
        href: '/all-products/',
        img: '/categories/vitaminas.webp',
      },
      {
        title: 'Suplementos',
        route: 'shorts',
        href: '/all-products/',
        img: '/categories/suplementos.webp',
      },
      {
        title: 'Lipoblue',
        route: 'lipoblue',
        href: '/all-products/',
        img: '/boost.jpg',
      },
    ],
    promos: [
      {
        title: 'PARA ELLA',
        subtitle: 'Ropa que no solo es comoda, se ve bien!',
        image:
          'https://alphaleteathletics.com/cdn/shop/files/forher5x12_9c986f9b-3ebd-4427-9b66-6dbb35ccf525.jpg?v=1751560816&width=960',
        buttonText: 'COMPRA YA',
      },
      {
        title: 'PARA EL',
        subtitle: 'Sientete seguro en cualquier momento',
        image:
          'https://alphaleteathletics.com/cdn/shop/files/forhim4x5_e6a226e9-6f4d-40e6-a91e-b224801b7d86.jpg?crop=center&v=1751560816&width=960',
        buttonText: 'COMPRA YA',
      },
      {
        title: 'ACCESORIOS',
        subtitle: 'No importa la ocasion, lo tenemos!',
        image: '/promo5.jpg',
        buttonText: 'COMPRA YA',
      },
    ],
    businesses: [
      {
        title: 'Etereah',
        subtitle: 'Los mejores Perfumes Arabes',
        image: '/etereah.webp',
        buttonText: 'COMPRA YA',
        url: 'https://www.etereah.com/',
      },
      {
        title: 'koxland',
        subtitle: 'Desarrollo Web a tu medida',
        image: '/koxland.png',
        buttonText: 'conocenos',
        url: 'https://koxland.dev/',
      },
      {
        title: 'fit world shop',
        subtitle: 'Suplementos Deportivos',
        image: '/fws.png',
        buttonText: 'COMPRA YA',
        url: 'https://www.fitworldshop.com.mx/',
      },
    ],
  }), []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    mainCarouselData,
    promoSectionData,
  }), [mainCarouselData, promoSectionData]);

  return (
    <ImageSourceContext.Provider value={contextValue}>
      {children}
    </ImageSourceContext.Provider>
  );
}

export const useImageSourceContext = () => useContext(ImageSourceContext);
