'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/Icons';
import Image from 'next/image';

const ImagesCarousel = ({
  items = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!items.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Carousel Content */}
      <div
        className={`flex ${pathname === '/' ? '' : ''} transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {typeof item === 'string' ? (
              <Image
                src={item}
                alt={`Carousel Image ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              item
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
          >
            <ChevronRightIcon size={20} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
              className={`focus-ring relative h-12 w-12 rounded-full p-3 transition-all duration-200`}
            >
              <span
                className={`block h-3 w-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-opacity-50 hover:bg-opacity-75 bg-white'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesCarousel;
