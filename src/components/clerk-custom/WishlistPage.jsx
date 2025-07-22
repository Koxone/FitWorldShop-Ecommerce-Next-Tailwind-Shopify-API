'use client';

import { useWishlist } from '@/context/product-card/WishlistContext';
import { useState, useEffect } from 'react';
import useShopifyProducts from '@/hooks/useShopifyProducts';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products, isLoading } = useShopifyProducts();
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (products && wishlist) {
      const wishlisted = products.filter(product => 
        wishlist[product.id] === true
      );
      setWishlistProducts(wishlisted);
    }
  }, [products, wishlist]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          Tu lista de deseos está vacía
        </h3>
        <p className="text-gray-400">
          Agrega productos a tu lista de deseos para verlos aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Mi Lista de Deseos
        </h2>
        <p className="text-gray-400">
          {wishlistProducts.length} producto{wishlistProducts.length !== 1 ? 's' : ''} en tu lista
        </p>
      </div>
      
      <div className="grid gap-4">
        {wishlistProducts.map((product) => (
          <div 
            key={product.id}
            className="flex items-center space-x-4 p-4 bg-neutral-800 rounded-lg border border-neutral-700"
          >
            <div className="flex-shrink-0">
              {product.images?.edges?.[0]?.node?.url ? (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.title}
                  className="h-16 w-16 object-cover rounded-md"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-600 rounded-md flex items-center justify-center">
                  <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">
                {product.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {product.priceRange?.minVariantPrice?.amount && (
                  <span>
                    ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                title="Quitar de lista de deseos"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => window.open(`/product-open/${product.handle}`, '_blank')}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Ver producto
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}