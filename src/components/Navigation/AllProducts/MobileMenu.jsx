'use client';

import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';
import OrdersModalTrigger from '@/components/buttons/OrdersModalTrigger';
import WishlistModal from '@/components/Feedback/Modals/WishlistProductsModal';
import { useState } from 'react';

export default function MobileMenu({ onClose }) {
  const router = useRouter();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { categoryLabels, getScopeState } = useCategoryFilter();

  let isSignedIn = false;
  try {
    const { useAuth } = require('@clerk/nextjs');
    const auth = useAuth();
    isSignedIn = auth?.isSignedIn || false;
  } catch {
    isSignedIn = false;
  }

  const menuItems = [
    { label: 'Inicio', path: '/', icon: '🏠' },
    { label: 'Todos los Productos', path: '/all-products', icon: '🛍️' },
    {
      label: 'Mi Perfil',
      path: '/user-profile',
      icon: '👤',
      requireAuth: true,
    },
  ];

  const organizedCategories = {
    main: ['Ropa', 'Suplementos', 'Vitaminas', 'Salud', 'Accesorios'],
    gender: ['Mujer', 'Hombre'],
    clothing: [
      'Crops',
      'Hoodies',
      'Pants',
      'Leggings',
      'Playeras',
      'Shorts',
      'Sudaderas',
      'Tanks',
      'Tops',
    ],
    accessories: [
      'Bodysuit',
      'Bras',
      'Mochilas',
      'Gorras',
      'Calcetines',
      'Underware',
    ],
    special: ['Novedades', 'Ofertas'],
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      Ropa: '👕',
      Suplementos: '💊',
      Vitaminas: '🌟',
      Salud: '❤️',
      Accesorios: '🎽',
      Mujer: '👩',
      Hombre: '👨',
      Crops: '👕',
      Hoodies: '🧥',
      Pants: '👖',
      Leggings: '🩱',
      Playeras: '👔',
      Shorts: '🩳',
      Sudaderas: '🧥',
      Tanks: '🎽',
      Tops: '👚',
      Bodysuit: '🩱',
      Bras: '👙',
      Mochilas: '🎒',
      Gorras: '🧢',
      Calcetines: '🧦',
      Underware: '🩲',
      Novedades: '✨',
      Ofertas: '🏷️',
    };
    return iconMap[category] || '📦';
  };

  const handleNavigation = (path) => {
    onClose();
    router.push(path);
  };

  const handleCategoryNavigation = (category) => {
    const { setCategory } = getScopeState('all-products');
    setCategory(category);
    onClose();
    router.push('/all-products');
  };

  return (
    <div className="flex h-full flex-col bg-slate-900 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white">Menú</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {/* Main Options */}
        <div className="space-y-3">
          {menuItems.map((item, index) =>
            item.requireAuth && !isSignedIn ? null : (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="flex w-full cursor-pointer items-center gap-4 rounded-lg bg-slate-800 p-4 text-white transition-colors hover:bg-slate-700"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </button>
            )
          )}
          {/* Wishlist Button */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="flex w-full cursor-pointer items-center gap-4 rounded-lg bg-slate-800 p-4 text-white transition-colors hover:bg-slate-700"
          >
            <span className="text-xl">❤️</span>
            <span className="text-sm text-white">Wishlist</span>
          </button>
        </div>

        {Object.entries(organizedCategories).map(([section, categories]) => (
          <div key={section}>
            <h3 className="mb-2 text-sm font-semibold text-gray-400 capitalize">
              {section === 'main'
                ? 'Categorías Principales'
                : section === 'gender'
                  ? 'Por Género'
                  : section === 'clothing'
                    ? 'Tipos de Ropa'
                    : section === 'accessories'
                      ? 'Accesorios'
                      : 'Especiales'}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className={`flex w-full cursor-pointer items-center gap-4 rounded-lg bg-slate-800 p-4 text-white transition-colors hover:bg-slate-700 ${
                    section === 'special'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : 'bg-slate-800 hover:bg-blue-600'
                  }`}
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-base">{category}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </div>
  );
}
