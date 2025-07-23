'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const UserOrders = dynamic(
  () => import('@/components/Feedback/UserOrders/UserOrders'),
  {
    ssr: false,
  }
);

export default function OrdersModalTrigger({ styles, showIcon = true }) {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll global cuando el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="text-white">
      <button onClick={() => setOpen(true)} className={`${styles}`}>
        {showIcon && <span className="mr-2 text-xl">📦</span>}
        <span>Ordenes</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-hidden rounded bg-[#101828] shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 z-10 cursor-pointer text-white"
            >
              ✕
            </button>

            {/* Scroll SOLO aquí */}
            <div className="h-full overflow-y-auto">
              <UserOrders />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
