'use client';

import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();

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

  const handleNavigation = (path) => {
    router.push(path);
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
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-center">Menú</h1>
        
        <div className="space-y-4 max-w-md mx-auto">
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
          
          <div className="pt-6 border-t border-slate-700">
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
      </div>
    </main>
  );
}