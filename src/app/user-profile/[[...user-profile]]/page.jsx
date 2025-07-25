'use client';

import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserProfilePage() {
  const { isLoggedIn, logout } = useShopifyAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div>Redirecting...</div>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 pb-20 text-white md:pb-10">
      <div className="relative w-full max-w-4xl">
        <div className="relative rounded-lg border border-neutral-700 bg-neutral-900 p-8 text-white shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Perfil de Usuario
          </h1>

          <div className="text-center">
            <p className="mb-6">
              El perfil de usuario ahora se maneja a través de Shopify Customer
              Account.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  window.location.href = 'https://account.fitworldshop.com/';
                }}
                className="rounded bg-green-500 px-6 py-3 text-white transition hover:bg-green-600"
              >
                Ir a Mi Cuenta en Shopify
              </button>
              <button
                onClick={logout}
                className="rounded bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
