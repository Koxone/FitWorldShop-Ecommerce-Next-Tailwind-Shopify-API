import { StarIcon } from '@/components/icons/Icons';
import React from 'react';

function Rating({ product }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            size={16}
            filled={i < Math.floor(product.rating)}
            className="text-yellow-400"
          />
        ))}
      </div>
      <span className="text-sm text-gray-400">
        {product.rating} ({product.reviewCount} reviews)
      </span>
    </div>
  );
}

export default Rating;
