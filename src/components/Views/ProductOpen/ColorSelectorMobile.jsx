'use client';
import React from 'react';

function ColorSelectorMobile({ product, onColorChange, isHidden }) {
  if (isHidden) return null;

  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === 'color'
  );

  if (!colorOption) return null;

  return (
    <div className="block md:hidden">
      <div className="flex gap-2">
        {colorOption.values.map((color) => (
          <span
            key={color}
            onClick={() => onColorChange(color)}
            className="h-10 w-10 cursor-pointer rounded-full border-2 border-white transition hover:scale-110"
            style={{ backgroundColor: color.toLowerCase() }}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSelectorMobile;
