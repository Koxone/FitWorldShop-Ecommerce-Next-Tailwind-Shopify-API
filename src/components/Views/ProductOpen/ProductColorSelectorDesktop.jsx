'use client';

import React from 'react';

function ProductColorSelectorDesktop({
  isVitaminOrSupplement,
  product,
  currentColor,
  changeColor,
}) {
  if (isVitaminOrSupplement) return null;

  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === 'color'
  );

  if (!colorOption) return null;

  return (
    <div className="hidden md:block">
      <h3 className="mb-2 text-sm font-semibold">Color: {currentColor}</h3>
      <div className="flex gap-2">
        {colorOption.values.map((color) => (
          <span
            key={color}
            onClick={() => changeColor(color)}
            className="h-10 w-10 cursor-pointer rounded-full border-2 border-white transition hover:scale-110"
            style={{ backgroundColor: color.toLowerCase() }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductColorSelectorDesktop;
