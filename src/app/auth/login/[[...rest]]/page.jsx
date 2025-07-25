'use client';

import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';
import { useAuth } from '@/context/Auth/AuthContextOptimized';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { isLoggedIn } = useShopifyAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/auth/dashboard');
    }
  }, [isLoggedIn, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 pb-20 text-white md:pb-10">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Iniciar Sesión
          </h1>
          <div className="text-center">
            <p className="mb-4">
              La autenticación ahora se maneja a través de Shopify
            </p>
            <button
              onClick={() => {
                window.location.href =
                  'https://account.fitworldshop.com/?return_url=https://www.fitworldshop.com/auth/dashboard';
              }}
              className="rounded bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
            >
              Ir a Shopify Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
