'use client';

import MainBanner from '@/components/banners/MainBanner';
import ViewAllButton from '@/components/buttons/general/ViewAllButton';
import ImagesCarousel from '@/components/carousels/HomeBanner/BannerCarousel';
import HomeProductCardsContainer from '@/components/containers/home/HomeProductCardsContainer';
import PromoSectionContainer from '@/components/containers/general/PromoSectionContainer';
import NewsLetter from '@/components/containers/home/newsletter/Newsletter';

export default function Home() {
  const heroItems = MainBanner();
  return (
    <main className="flex min-h-screen flex-col items-center gap-10">
      <ImagesCarousel
        items={heroItems}
        autoPlay={true}
        autoPlayInterval={5000}
        showDots={true}
        showArrows={true}
      />

      <div className="flex w-full max-w-7xl flex-col gap-6 justify-self-center md:px-10">
        <div className="flex flex-col gap-6">
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

        {/* Categories Sections */}
        <PromoSectionContainer
          title="Categorias"
          subtitle="podria interesarte"
          type="categories"
        />

        {/* Promotional Sections */}
        <PromoSectionContainer
          title="Conoce nuestras marcas"
          subtitle="podria interesarte"
          type="businesses"
        />
      </div>
      <NewsLetter />
    </main>
  );
}
