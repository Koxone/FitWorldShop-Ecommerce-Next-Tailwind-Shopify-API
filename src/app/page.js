'use client';

import MainBanner from '@/components/banners/MainBanner';
import ViewAllButton from '@/components/buttons/products/ViewAllButton';
import ImagesCarousel from '@/components/carousels/ImagesCarousel';
import HomeProductCardsContainer from '@/components/containers/HomeProductCardsContainer';
import PromoSectionContainer from '@/components/containers/PromoSectionContainer';
import NewsLetter from '@/components/newsletter/Newsletter';

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
        <div>
          <HomeProductCardsContainer
            title="Ropa Deportiva"
            subtitle="Para Hombre y Mujer"
            filterType="gender"
          />
          <ViewAllButton />
        </div>
        <div>
          <HomeProductCardsContainer
            title="Vitaminas y Suplementos"
            subtitle="Salud y Bienestar"
            filterType="category"
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
