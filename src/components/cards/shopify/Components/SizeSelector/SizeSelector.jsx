import React from 'react';

function SizeSelector({ product }) {
  const sizeOption = product.options?.find(
    (o) => o.name.toLowerCase() === 'talla'
  );

  if (!sizeOption) return null;

  return (
    <div className="mt-2 hidden flex-wrap gap-2 lg:flex">
      {sizeOption.values.map((size, index) => (
        <span
          key={index}
          className="rounded border border-gray-500 px-3 py-1.5 text-xs text-white"
        >
          {size}
        </span>
      ))}
    </div>
  );
}

export default SizeSelector;
