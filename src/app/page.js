'use client';

import MainBanner from '@/components/banners/MainBanner';
import ViewAllButton from '@/components/buttons/general/ViewAllButton';
import ImagesCarousel from '@/components/carousels/HomeBanner/BannerCarousel';
import HomeProductCardsContainer from '@/components/containers/home/HomeProductCardsContainer';
import PromoSectionContainer from '@/components/containers/general/PromoSectionContainer';
import NewsLetter from '@/components/containers/home/newsletter/Newsletter';
import RevealOnScroll from '@/Styles/RevealOnScroll';
import dynamic from 'next/dynamic';
import HomeContextProvider from '@/providers/HomeContextProvider';
import ProductContextProvider from '@/providers/ProductContextProvider';
import { useEffect, useState } from 'react';

// Dynamically import Clerk component to prevent SSR issues
const LogUserEmailOnLogin = dynamic(
  () => import('@/components/LogUserEmailOnLogin'),
  { ssr: false }
);

export default function Home() {
  return (
    <HomeContextProvider>
      <ProductContextProvider>
        <HomeContent />
      </ProductContextProvider>
    </HomeContextProvider>
  );
}

function HomeContent() {
  const heroItems = MainBanner();
  const [isClerkAvailable, setIsClerkAvailable] = useState(false);

  useEffect(() => {
    // Check if Clerk is properly configured
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const hasValidClerkKey =
      clerkPublishableKey &&
      clerkPublishableKey.startsWith('pk_') &&
      !clerkPublishableKey.includes('dummy');
    
    setIsClerkAvailable(hasValidClerkKey);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 md:gap-10">
      {isClerkAvailable && <LogUserEmailOnLogin />}
      <ImagesCarousel
        items={heroItems}
        autoPlay={true}
        autoPlayInterval={5000}
        showDots={true}
        showArrows={true}
      />

      <div className="flex w-full max-w-7xl flex-col gap-4 justify-self-center px-4 sm:px-6 md:px-10">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 md:gap-6">
            <HomeProductCardsContainer
              title1="Quemadores"
              subtitle1="Para Hombre y Mujer"
              title2="Vitaminas y Suplementos"
              subtitle2="Para tu salud"
              viewScope1="lipoblue"
              viewScope2="vitamins"
            />
            <ViewAllButton />
          </div>
        </RevealOnScroll>

        {/* Categories Sections */}
        <RevealOnScroll>
          <PromoSectionContainer
            title="Categorias"
            subtitle="podria interesarte"
            type="categories"
          />
        </RevealOnScroll>

        {/* Promotional Sections */}
        <RevealOnScroll>
          <PromoSectionContainer
            title="Conoce nuestras marcas"
            subtitle="podria interesarte"
            type="businesses"
          />
        </RevealOnScroll>
      </div>
      
      {/* Newsletter with proper bottom spacing for mobile navigation */}
      <div className="w-full pb-20 md:pb-10">
        <NewsLetter />
      </div>
    </main>
  );
}
