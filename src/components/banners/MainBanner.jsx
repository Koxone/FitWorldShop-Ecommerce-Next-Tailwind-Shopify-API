'use client';

import { useCategoryFilter } from '@/context/filters/CategoryFilterContextOptimized';
import { useImageSourceContext } from '@/context/general/ImageSourceContext';
import { useRouter } from 'next/navigation';

export default function MainBanner() {
  const { mainCarouselData } = useImageSourceContext();
  const router = useRouter();

  return mainCarouselData.map((item, index) => (
    <div
      key={index}
      className="relative flex h-[50vh] items-center justify-center bg-black bg-cover bg-center text-center lg:h-[70vh]"
    >
      <img
        src={`${item.image}`}
        alt="Main Banner"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <h1 className="font-montserrat mb-4 text-4xl font-bold tracking-wider text-white md:text-6xl lg:text-8xl">
          {item.title}
        </h1>
        <p className="font-inter mb-6 text-lg text-white md:text-xl lg:text-2xl">
          {item.description}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => router.push('/all-products')}
            className="hover-lift focus-ring font-poppins cursor-pointer rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 md:px-8 md:py-4"
          >
            {item.button}
          </button>
        </div>
      </div>
    </div>
  ));
}
