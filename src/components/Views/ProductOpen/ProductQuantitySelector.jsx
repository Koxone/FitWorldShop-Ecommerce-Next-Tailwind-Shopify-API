'use client';

import React from 'react';
import { MinusIcon, PlusIcon } from '@/components/icons/Icons';

function ProductQuantitySelector({ quantity, changeQuantity }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Cantidad</h3>
      <div className="flex items-center gap-2">
        <button
          onClick={() => changeQuantity(-1)}
          className="cursor-pointer rounded bg-gray-700 p-2 hover:bg-gray-600"
        >
          <MinusIcon size={14} />
        </button>
        <span className="px-3">{quantity}</span>
        <button
          onClick={() => changeQuantity(1)}
          className="cursor-pointer rounded bg-gray-700 p-2 hover:bg-gray-600"
        >
          <PlusIcon size={14} />
        </button>
      </div>
    </div>
  );
}

export default ProductQuantitySelector;
