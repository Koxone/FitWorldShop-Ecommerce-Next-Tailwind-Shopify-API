'use client';

import { useEffect, useState } from 'react';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-white">Cargando órdenes...</p>;
  if (!orders.length) return <p className="text-white">No se encontraron órdenes.</p>;

  return (
    <div className="mt-8 space-y-4">
      {orders.map(order => (
        <div key={order.id} className="rounded bg-neutral-800 p-4 text-white shadow">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Fecha:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          <p><strong>Total:</strong> {order.total_price} {order.currency}</p>
          <p><strong>Estado:</strong> {order.financial_status}</p>
        </div>
      ))}
    </div>
  );
}
