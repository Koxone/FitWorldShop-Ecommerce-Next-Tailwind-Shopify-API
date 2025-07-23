'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const UserOrders = dynamic(
  () => import('@/components/Feedback/UserOrders/UserOrders'),
  {
    ssr: false,
  }
);

export default function OrdersModalTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white">
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-800"
      >
        Ver Mis Órdenes
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-w-xl rounded bg-neutral-900 p-6 shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-white"
            >
              ✕
            </button>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Mis Órdenes
            </h2>
            <UserOrders />
          </div>
        </div>
      )}
    </div>
  );
}
