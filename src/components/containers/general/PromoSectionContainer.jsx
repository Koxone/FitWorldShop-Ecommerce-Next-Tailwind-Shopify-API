'use client';

import { useImageSourceContext } from '@/context/general/ImageSourceContext';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useCategoryFilter } from '../../../context/filters/CategoryFilterContext';

function PromoSectionContainer({ title, subtitle, type }) {
  const pathname = usePathname();
  const router = useRouter();

  const { getScopeState } = useCategoryFilter();
  const { setCategory } = getScopeState('all-products');

  const { promoSectionData } = useImageSourceContext();

  const handleClick = (section) => {
    if (type === 'categories') {
      setCategory(section.title);
      router.push('/all-products');
    } else if (type === 'businesses' && section.url) {
      window.open(section.url, '_blank');
    } else if (type === 'promo') {
      setCategory();
    }
  };

  return (
    <section
      className={`flex w-full flex-col items-start justify-center ${
        pathname === '/'
          ? 'px-4 md:px-0'
          : pathname.startsWith('/product-open')
            ? 'md:px-0'
            : 'px-0 md:px-10'
      }`}
    >
      <div className="animate-fade-in mb-4 text-left md:pl-0">
        <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
          {subtitle}
        </h2>
        <h2 className="text-2xl font-bold tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      <div className="flex w-full snap-x snap-mandatory justify-between gap-3 overflow-x-auto pb-4 md:gap-4 md:px-0">
        {promoSectionData[type]?.map((section, idx) => {
          let imgClass = 'object-cover';

          if (
            type === 'businesses' &&
            section.title.toLowerCase() === 'koxland'
          ) {
            imgClass = 'object-contain p-6';
          } else if (type === 'businesses' && idx === 0) {
            imgClass += ' translate-y-0';
          } else if (type === 'businesses' && idx === 1) {
            imgClass += ' -translate-y-2';
          } else if (type === 'businesses' && idx === 2) {
            imgClass +=
              'md:ml-0 -ml-5 md:-ml-0 -translate-y-10 md:-translate-y-0';
          }

          return (
            <div
              key={idx}
              onClick={() => handleClick(section)}
              className="group relative aspect-square w-[300px] min-w-[70%] cursor-pointer snap-center overflow-hidden rounded-lg border border-neutral-600/40 sm:w-[350px] sm:min-w-[60%] md:w-[400px] md:min-w-[40%] lg:min-w-[30%]"
            >
              <div className="absolute inset-0">
                <img
                  src={section.image || section.img}
                  alt={section.title}
                  className={`absolute inset-0 h-full w-full transition-transform duration-1000 ease-out group-hover:scale-110 ${imgClass}`}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="absolute bottom-0 left-0 flex flex-col p-4 md:p-6">
                <h3 className="text-base font-bold text-white uppercase sm:text-lg md:text-2xl">
                  {section.title}
                </h3>
                <h3 className="mb-3 text-sm text-white sm:text-base md:mb-4">
                  {section.subtitle}
                </h3>
                <div className="cursor-pointer rounded-full bg-white px-6 py-1.5 text-center text-sm font-semibold text-black uppercase transition-all duration-300 ease-in-out hover:bg-neutral-300 sm:px-8 sm:py-2 md:px-10">
                  {section.buttonText || 'Shop Now'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PromoSectionContainer;
