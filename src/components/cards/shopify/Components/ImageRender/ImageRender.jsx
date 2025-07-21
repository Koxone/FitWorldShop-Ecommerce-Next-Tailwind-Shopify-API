'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

function ImageRender({ product, productImages }) {
  const router = useRouter();

  const imageUrl =
    productImages[product.id] ||
    product.featuredImage?.url ||
    product.images.edges[0]?.node.url;

  return (
    <div className="relative aspect-square w-full overflow-hidden">
      <Link href={`/product-open/${product.handle}`}>
        <Image
          priority
          src={imageUrl}
          alt={`Imagen del producto: ${product.title}`}
          width={500}
          height={500}
          className="w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </Link>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4">
        <button
          onClick={() => router.push(`/product-open/${product.handle}`)}
          className="focus-ring hidden w-full cursor-pointer rounded bg-white px-4 py-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-300 md:block"
        >
          Vista Rápida
        </button>
      </div>
    </div>
  );
}

export default ImageRender;
