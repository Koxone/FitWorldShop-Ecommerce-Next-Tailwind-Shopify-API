'use client';

import { ImageSourceProvider } from '@/context/general/ImageSourceContext';

/**
 * Home page specific contexts provider
 * Used only for the home page that needs image source data
 */
export default function HomeContextProvider({ children }) {
  return (
    <ImageSourceProvider>
      {children}
    </ImageSourceProvider>
  );
}