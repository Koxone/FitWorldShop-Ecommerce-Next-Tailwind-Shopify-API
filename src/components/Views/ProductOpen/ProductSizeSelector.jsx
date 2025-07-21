'use client';

import React from 'react';

function ProductSizeSelector({
  isVitaminOrSupplement,
  sizes,
  selectedSize,
  setSelectedSize,
}) {
  if (isVitaminOrSupplement || sizes.length === 0) return null;

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Talla</h3>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium ${
              selectedSize === size
                ? 'border-white bg-white text-gray-900'
                : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductSizeSelector;
