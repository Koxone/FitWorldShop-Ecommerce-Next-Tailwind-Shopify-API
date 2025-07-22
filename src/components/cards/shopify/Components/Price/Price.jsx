import React from 'react';

function Price({ product }) {
  return (
    <div className="md:flex md:gap-2">
      <p className="text-sm font-bold text-text md:text-lg font-sans">
        ${product.variants.edges[0].node.price.amount}{' '}
        {product.variants.edges[0].node.price.currencyCode}
      </p>
      {/* Descuento */}
      {product.compareAtPriceRange?.maxVariantPrice?.amount && (
        <p className="text-xs text-muted line-through md:text-sm font-sans">
          ${product.compareAtPriceRange.maxVariantPrice.amount}{' '}
          {product.compareAtPriceRange.maxVariantPrice.currencyCode}
        </p>
      )}
    </div>
  );
}

export default Price;
