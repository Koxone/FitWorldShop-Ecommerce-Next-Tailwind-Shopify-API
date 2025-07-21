import React from 'react';

function Price({ product }) {
  return (
    <div className="md:flex md:gap-2">
      <p className="text-sm font-bold text-white md:text-lg">
        ${product.variants.edges[0].node.price.amount}{' '}
        {product.variants.edges[0].node.price.currencyCode}
      </p>
      {/* Descuento */}
      {product.compareAtPriceRange?.maxVariantPrice?.amount && (
        <p className="text-xs text-gray-500 line-through md:text-sm">
          ${product.compareAtPriceRange.maxVariantPrice.amount}{' '}
          {product.compareAtPriceRange.maxVariantPrice.currencyCode}
        </p>
      )}
    </div>
  );
}

export default Price;
