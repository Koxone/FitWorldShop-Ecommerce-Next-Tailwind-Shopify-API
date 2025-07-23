'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken(); // 🔐 Obtiene el token de Clerk

        const res = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          setError('No se pudieron cargar las órdenes.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al obtener órdenes.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getToken]);

  if (loading) return <p className="text-white">Cargando órdenes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orders.length) return <p className="text-white">No se encontraron órdenes.</p>;

  return (
    <div className="mt-4 space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-md border border-neutral-700 bg-neutral-800 p-4 text-white shadow-sm"
        >
          <div className="mb-1 text-sm text-neutral-400">Orden #{order.name || order.id}</div>
          <p className="text-sm"><strong>Fecha:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          <p className="text-sm"><strong>Total:</strong> {order.total_price} {order.currency}</p>
          <p className="text-sm"><strong>Estado:</strong> {order.financial_status}</p>
          <p className="text-sm"><strong>Email:</strong> {order.email}</p>
        </div>
      ))}
    </div>
  );
}
