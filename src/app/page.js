'use client';

import MainBanner from '@/components/banners/MainBanner';
import ViewAllButton from '@/components/buttons/general/ViewAllButton';
import ImagesCarousel from '@/components/carousels/HomeBanner/BannerCarousel';
import HomeProductCardsContainer from '@/components/containers/home/HomeProductCardsContainer';
import PromoSectionContainer from '@/components/containers/general/PromoSectionContainer';
import NewsLetter from '@/components/containers/home/newsletter/Newsletter';
import RevealOnScroll from '@/Styles/RevealOnScroll';
import LogUserEmailOnLogin from '@/components/LogUserEmailOnLogin';

export default function Home() {
  const heroItems = MainBanner();
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 md:gap-10">
      <LogUserEmailOnLogin />
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
              title1="Ropa Deportiva"
              subtitle1="Para Hombre y Mujer"
              title2="Vitaminas y Suplementos"
              subtitle2="Para tu salud"
              viewScope1="home"
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
