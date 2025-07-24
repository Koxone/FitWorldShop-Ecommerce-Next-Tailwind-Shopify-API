'use client';

import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';
import OrdersModalTrigger from '@/components/buttons/OrdersModalTrigger';

export default function MenuPage() {
  const router = useRouter();
  const { categoryLabels, getScopeState } = useCategoryFilter();

  // Safely get auth state, fallback to false if Clerk is not properly configured
  let isSignedIn = false;
  try {
    const { useAuth } = require('@clerk/nextjs');
    const auth = useAuth();
    isSignedIn = auth?.isSignedIn || false;
  } catch (error) {
    // Clerk not properly configured, continue with isSignedIn = false
    console.warn('Clerk auth not available:', error.message);
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

  // Organize categories by type for better UX
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

  // Get category icons for better visual representation
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
    router.push(path);
  };

  const handleCategoryNavigation = (category) => {
    // Get the setCategory function for all-products scope
    const { setCategory } = getScopeState('all-products');

    // Set the category for the all-products page
    setCategory(category);

    // Navigate to all-products page
    router.push('/all-products');
  };

  const handleAuthAction = () => {
    if (isSignedIn) {
      // If signed in, try to sign out
      try {
        const { useClerk } = require('@clerk/nextjs');
        const clerk = useClerk();
        clerk.signOut();
      } catch (error) {
        console.warn('Clerk signout not available:', error.message);
        // Fallback to navigate to home
        router.push('/');
      }
    } else {
      // If not signed in, navigate to login
      router.push('/auth/login');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 pb-20 text-white md:pb-10">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Menú</h1>

        {/* Main Navigation */}
        <div className="mx-auto mb-8 max-w-md space-y-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.requireAuth && !isSignedIn ? null : (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-lg bg-slate-800 p-4 transition-colors duration-200 hover:bg-slate-700"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </button>
              )}
            </div>
          ))}
          <OrdersModalTrigger styles="flex w-full cursor-pointer items-center gap-4 rounded-lg bg-slate-800 p-4 transition-colors duration-200 hover:bg-slate-700">
            <div className="flex items-center gap-4 rounded-lg bg-slate-800 p-4 transition-colors duration-200 hover:bg-slate-700">
              <span className="text-xl">📦</span>
              <span className="text-sm text-white">Órdenes</span>
            </div>
          </OrdersModalTrigger>
        </div>

        {/* Categories Section */}
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-blue-400">
            Categorías
          </h2>

          {/* Main Categories */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Categorías Principales
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {organizedCategories.main.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 text-left transition-colors duration-200 hover:bg-blue-600"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gender Categories */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Por Género
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {organizedCategories.gender.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 text-left transition-colors duration-200 hover:bg-blue-600"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clothing Types */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Tipos de Ropa
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {organizedCategories.clothing.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 text-left transition-colors duration-200 hover:bg-blue-600"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Accesorios y Complementos
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {organizedCategories.accessories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 text-left transition-colors duration-200 hover:bg-blue-600"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Categories */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Especiales
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {organizedCategories.special.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-left transition-colors duration-200 hover:from-purple-700 hover:to-blue-700"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="mx-auto max-w-md border-t border-slate-700 pt-6">
          <button
            onClick={handleAuthAction}
            className={`flex w-full items-center gap-4 rounded-lg p-4 transition-colors duration-200 ${
              isSignedIn
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <span className="text-2xl">{isSignedIn ? '🚪' : '🔑'}</span>
            <span className="text-lg">
              {isSignedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
