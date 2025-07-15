'use client';

import { useImageSourceContext } from '@/context/general/ImageSourceContext';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function PromoSectionContainer({ title, subtitle, type }) {
  // Hooks
  const pathname = usePathname();
  const router = useRouter();

  // Context
  const { promoSectionData } = useImageSourceContext();

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
      <div className="animate-fade-in mb-4 pl-5 text-left md:pl-0">
        <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
          {subtitle}
        </h2>
        <h2 className="text-2xl font-bold tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex w-full snap-x snap-mandatory justify-between gap-4 overflow-x-auto pb-4 md:px-0">
        {promoSectionData[type]?.map((section, idx) => {
          let imgClass = 'object-cover';

          if (
            type === 'businesses' &&
            section.title.toLowerCase() === 'koxland'
          ) {
            imgClass = 'object-contain p-6';
          } else if (idx === 0) {
            imgClass += ' translate-y-0';
          } else if (idx === 1) {
            imgClass += ' -translate-y-2';
          } else if (type === 'businesses' && idx === 2) {
            imgClass +=
              'md:ml-0 -ml-5 md:-ml-0 -translate-y-10 md:-translate-y-0';
          }

          return (
            <a
              href={section.url || section.href || '#'}
              rel="noopener noreferrer"
              key={idx}
              className="group relative aspect-square w-[400px] min-w-[80%] cursor-pointer snap-center overflow-hidden rounded-lg border border-neutral-600/40 sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%]"
            >
              <div className="absolute inset-0">
                <img
                  src={section.image || section.img}
                  alt={section.title}
                  className={`absolute inset-0 h-full w-full transition-transform duration-1000 ease-out group-hover:scale-110 ${imgClass}`}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="absolute bottom-0 left-0 flex flex-col p-6">
                <h3 className="text-lg font-bold text-white uppercase md:text-2xl">
                  {section.title}
                </h3>
                <h3 className="mb-4 text-white">{section.subtitle}</h3>
                <div className="cursor-pointer rounded-full bg-white px-10 py-2 text-center font-semibold text-black uppercase transition-all duration-300 ease-in-out hover:bg-neutral-300">
                  {section.buttonText || 'Shop Now'}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default PromoSectionContainer;

// Use Examples

// <PromoSectionContainer
//   title="Categorias"
//   subtitle="podria interesarte"
//   type="categories"
// />

// <PromoSectionContainer
//   title="Conoce nuestras marcas"
//   subtitle="podria interesarte"
//   type="businesses"
// />
