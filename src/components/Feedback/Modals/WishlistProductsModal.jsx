'use client';

import WishlistItem from '@/components/cards/Wishlist/WishlistItem';
import GeneralModal from '@/components/Feedback/Modals/GeneralModal';
import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WishlistModal({ isOpen, onClose }) {
  const { wishlistedProducts, setWishlistedProducts } = useShopifyAuthContext();
  const router = useRouter();

  const handleRemove = (productId) => {
    setWishlistedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleNavigate = (handle) => {
    onClose();
    router.push(`/product-open/${handle}`);
  };

  // Scroll Propagation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose} title="Mi Wishlist">
      <div className="max-h-[80vh] w-full max-w-md overflow-x-hidden overflow-y-auto rounded-xl bg-gray-900 p-5 shadow-xl">
        {wishlistedProducts.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            No tienes productos en tu wishlist.
          </p>
        ) : (
          <div className="space-y-3">
            {wishlistedProducts.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                onNavigate={handleNavigate}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </GeneralModal>
  );
}
