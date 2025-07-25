'use client';

import { TrashIcon } from '@/components/icons/Icons';
import React, { memo } from 'react';

const WishlistItem = memo(({ product, onNavigate, onRemove }) => {
  return (
    <div
      className="group flex cursor-pointer items-center gap-4 rounded-lg bg-gray-800 p-3 transition hover:bg-gray-700"
      onClick={() => onNavigate(product.handle)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-20 w-20 flex-shrink-0 rounded-lg object-cover ring-1 ring-gray-700"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{product.title}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-gray-400">
            {product.description}
          </p>

          {(product.selectedColor || product.selectedSize) && (
            <div className="mt-1 flex items-center gap-2">
              {product.selectedColor && (
                <div
                  className="h-4 w-4 rounded-full border border-gray-600"
                  style={{ backgroundColor: product.selectedColor }}
                />
              )}
              {product.selectedSize && (
                <span className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                  {product.selectedSize}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-white">${product.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(product.id);
            }}
            className="rounded p-1 cursor-pointer text-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

WishlistItem.displayName = 'WishlistItem';

export default WishlistItem;
