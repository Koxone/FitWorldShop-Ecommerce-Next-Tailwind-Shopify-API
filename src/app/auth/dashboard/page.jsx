'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, clientNumber, username, logout } =
    useShopifyAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  const [activeTab, setActiveTab] = useState('profile');

  const handleSignOut = () => {
    logout();
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-white">Redirecting to login...</div>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
          {username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {username || 'Usuario de Shopify'}
          </h2>
          <p className="text-gray-400">ID de Cliente: {clientNumber}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => {
                window.location.href = 'https://account.fitworldshop.com/';
              }}
              className="rounded bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600"
            >
              Editar en Shopify
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-400">
          Para actualizar tu información personal completa, incluyendo
          dirección, teléfono y otros datos, utiliza tu cuenta de Shopify.
        </p>
        <button
          onClick={() => {
            window.location.href = 'https://account.fitworldshop.com/';
          }}
          className="rounded bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
        >
          Administrar Cuenta en Shopify
        </button>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h3 className="mb-2 text-lg font-semibold text-white">
          Cambiar Contraseña
        </h3>
        <p className="mb-4 text-gray-400">
          Para cambiar tu contraseña, debes usar tu cuenta de Shopify.
        </p>
        <button
          onClick={() => {
            window.location.href =
              'https://account.fitworldshop.com/account/login';
          }}
          className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Cambiar Contraseña en Shopify
        </button>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Historial de Pedidos</h3>
      <div className="rounded-lg bg-gray-800 p-6">
        <p className="mb-4 text-gray-400">
          Para ver tu historial completo de pedidos, visita tu cuenta de
          Shopify.
        </p>
        <button
          onClick={() => {
            window.location.href = 'https://account.fitworldshop.com/account';
          }}
          className="rounded bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
        >
          Ver Pedidos en Shopify
        </button>
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="py-12 text-center text-gray-400">
      <p>Tu wishlist se maneja localmente en la aplicación.</p>
      <p className="mt-2">
        Los productos se guardan automáticamente cuando los agregas a favoritos.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Mi Cuenta</h1>
          <button
            onClick={handleSignOut}
            className="flex cursor-pointer items-center gap-2 text-red-400 transition hover:text-red-300"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="flex overflow-hidden rounded bg-gray-800">
          {['profile', 'orders', 'wishlist'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 cursor-pointer py-2 transition ${
                activeTab === tab
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab === 'profile'
                ? 'Perfil'
                : tab === 'orders'
                  ? 'Pedidos'
                  : 'Wishlist'}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'wishlist' && renderWishlistTab()}
      </div>
    </div>
  );
}
