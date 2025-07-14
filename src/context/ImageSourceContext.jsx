'use client';

import { createContext, useContext, useState } from 'react';

const ImageSourceContext = createContext();

export function ImageSourceProvider({ children }) {
  // MainCarousel
  const mainCarouselData = [
    {
      image:
        'https://dslv9ilpbe7p1.cloudfront.net/nnUUNyfkb8wdewfgcrg0UQ_store_banner_image.png',
      title: '10% DE DESCUENTO',
      description:
        '¡Nuestra nueva línea de ropa ha llegado! ¡Descuentos en toda la tienda!',
      button: 'COMPRA AHORA',
    },
    {
      image: '/Banner/Main-Banner-2.png',
      title: 'PRESENTAMOS PUMP',
      description:
        'Desarrollado para moldearse a tu cuerpo y mostrar tu mejor figura.',
      button: 'COMPRA AHORA',
    },
    {
      image:
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzpY5GY2RijT8oel1vk8ET14oXNhB9k6OB1kKOOJeeny_lPKb-1lhJJ41XGzWEE4xaOKq-FQzLiVgfTG7FY_gYuuRTZKtZL-396-t6WuU4NrePVysAsoxOdVhLlYj4WZHThv-i-EfTx9o/s1600/4+Reasons+to+Invest+in+Quality+Workout+Clothes.jpg',
      title: 'ESENCIALES DE VERANO',
      description: 'Esenciales básicos hechos para ti...',
      button: 'COMPRA AHORA',
    },
    {
      image: '/Banner/Main-Banner-4.jpg',
      title: 'TODO PARA TUS ENTRENAMIENTOS',
      description: 'Encuentra todo lo que necesitas para rendir al máximo.',
      button: 'COMPRA AHORA',
    },
  ];

  return (
    <ImageSourceContext.Provider
      value={{
        mainCarouselData,
      }}
    >
      {children}
    </ImageSourceContext.Provider>
  );
}

export const useImageSourceContext = () => useContext(ImageSourceContext);
