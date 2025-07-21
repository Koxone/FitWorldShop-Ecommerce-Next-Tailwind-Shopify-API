import React from 'react';

function ColorSelector({ product }) {
  return (
    <div className="mt-2 flex gap-1">
      {product.options
        ?.find((o) => o.name.toLowerCase() === 'color')
        ?.values.map((color, index) => (
          <span
            key={index}
            className="h-5 w-5 rounded-full border border-gray-600"
            style={{
              backgroundColor: color.toLowerCase(),
            }}
            title={color}
          />
        ))}
    </div>
  );
}

export default ColorSelector;
