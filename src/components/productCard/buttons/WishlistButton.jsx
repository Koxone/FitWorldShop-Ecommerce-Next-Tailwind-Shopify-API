'use client';

import { HeartIcon } from '@/components/icons/Icons';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ productId, className = '' }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`bg-opacity-50 hover:bg-opacity-75 focus-ring absolute top-3 right-3 z-50 cursor-pointer rounded-full bg-black p-2 lg:opacity-0 transition-all 
        duration-200 ease-in-out group-hover:opacity-100 hover:scale-125 ${className}`}
    >
      <HeartIcon
        size={16}
        filled={isWishlisted(productId)}
        className={isWishlisted(productId) ? 'text-red-500' : 'text-white'}
      />
    </button>
  );
}
