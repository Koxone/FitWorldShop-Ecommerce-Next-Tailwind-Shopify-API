import React from 'react';

function CategoryTags({ product }) {
  if (!product?.tags?.length) return null;

  const formattedTags = product.tags
    .map((tag) =>
      tag
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(', ');

  return (
    <p className="hidden text-xs text-gray-500 lg:block">
      Categoría: {formattedTags}
    </p>
  );
}

export default CategoryTags;
