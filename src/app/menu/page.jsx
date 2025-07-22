'use client';

import { useRouter } from 'next/navigation';
import { useCategoryFilter } from '@/context/filters/CategoryFilterContext';

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
    { label: 'Mi Perfil', path: '/user-profile', icon: '👤', requireAuth: true },
  ];

  // Organize categories by type for better UX
  const organizedCategories = {
    main: ['Ropa', 'Suplementos', 'Vitaminas', 'Salud', 'Accesorios'],
    gender: ['Mujer', 'Hombre'],
    clothing: ['Crops', 'Hoodies', 'Pants', 'Leggings', 'Playeras', 'Shorts', 'Sudaderas', 'Tanks', 'Tops'],
    accessories: ['Bodysuit', 'Bras', 'Mochilas', 'Gorras', 'Calcetines', 'Underware'],
    special: ['Novedades', 'Ofertas']
  };

  // Get category icons for better visual representation
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Ropa': '👕',
      'Suplementos': '💊',
      'Vitaminas': '🌟',
      'Salud': '❤️',
      'Accesorios': '🎽',
      'Mujer': '👩',
      'Hombre': '👨',
      'Crops': '👕',
      'Hoodies': '🧥',
      'Pants': '👖',
      'Leggings': '🩱',
      'Playeras': '👔',
      'Shorts': '🩳',
      'Sudaderas': '🧥',
      'Tanks': '🎽',
      'Tops': '👚',
      'Bodysuit': '🩱',
      'Bras': '👙',
      'Mochilas': '🎒',
      'Gorras': '🧢',
      'Calcetines': '🧦',
      'Underware': '🩲',
      'Novedades': '✨',
      'Ofertas': '🏷️'
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
    <main className="min-h-screen bg-slate-900 text-white pb-[100px]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-center">Menú</h1>
        
        {/* Main Navigation */}
        <div className="space-y-4 max-w-md mx-auto mb-8">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.requireAuth && !isSignedIn ? null : (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Categorías</h2>
          
          {/* Main Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Categorías Principales</h3>
            <div className="grid grid-cols-2 gap-3">
              {organizedCategories.main.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-left"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gender Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Por Género</h3>
            <div className="grid grid-cols-2 gap-3">
              {organizedCategories.gender.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-left"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clothing Types */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Tipos de Ropa</h3>
            <div className="grid grid-cols-2 gap-3">
              {organizedCategories.clothing.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-left"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Accesorios y Complementos</h3>
            <div className="grid grid-cols-2 gap-3">
              {organizedCategories.accessories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-left"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Especiales</h3>
            <div className="grid grid-cols-2 gap-3">
              {organizedCategories.special.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryNavigation(category)}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors duration-200 text-left"
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="max-w-md mx-auto pt-6 border-t border-slate-700">
          <button 
            onClick={handleAuthAction}
            className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 ${
              isSignedIn 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <span className="text-2xl">{isSignedIn ? '🚪' : '🔑'}</span>
            <span className="text-lg">{isSignedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}</span>
          </button>
        </div>
      </div>
    </main>
  );
}