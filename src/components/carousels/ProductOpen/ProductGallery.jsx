'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/Icons';

function ProductGallery({ product, images, overrideImage }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentImage =
    overrideImage ||
    images[selectedImageIndex]?.node.url ||
    product?.featuredImage?.url;

  return (
    <div className="animate-slide-in-left flex max-h-[750px] max-w-[550px] flex-col items-center">
      {/* Imagen principal */}
      <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
        <Image
          src={currentImage}
          alt={product.title}
          width={800}
          height={800}
          priority
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {selectedImageIndex > 0 && (
          <button
            onClick={() => setSelectedImageIndex((i) => i - 1)}
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black"
          >
            <ChevronLeftIcon />
          </button>
        )}
        {selectedImageIndex < images.length - 1 && (
          <button
            onClick={() => setSelectedImageIndex((i) => i + 1)}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>

      {/* Miniaturas */}
      <div className="flex gap-3 lg:flex lg:w-full lg:overflow-x-auto">
        {images.slice(0, 5).map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`aspect-square overflow-hidden rounded-lg border ${
              selectedImageIndex === index
                ? 'border-blue-500'
                : 'border-gray-600'
            } cursor-pointer bg-gray-800 transition-all duration-200 hover:border-gray-400 lg:min-w-[190px]`}
          >
            <Image
              priority
              src={img.node.url}
              alt={`${product.title} thumbnail ${index + 1}`}
              width={200}
              height={200}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
