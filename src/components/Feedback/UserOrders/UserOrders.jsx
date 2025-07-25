'use client';

import { useEffect, useState } from 'react';
import { useShopifyAuthContext } from '@/context/Auth/ShopifyAuthContext';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isLoggedIn, clientNumber } = useShopifyAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!isLoggedIn) {
          setError('Debes iniciar sesión para ver tus órdenes.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/orders');
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
  }, [isLoggedIn, clientNumber]);

  if (loading)
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <p className="text-sm text-gray-400">Cargando órdenes...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );

  if (!orders.length)
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <p className="text-sm text-gray-400">No se encontraron órdenes.</p>
      </div>
    );

  return (
    <div className="max-h-[90vh] overflow-y-auto p-4 pb-10 md:p-6 lg:pb-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <h2 className="text-xl font-bold text-white md:text-2xl">
            Mis Órdenes
          </h2>
          <p className="text-sm text-gray-400">
            Historial de tus compras realizadas
          </p>
        </header>

        {orders.map((order) => (
          <section
            key={order.id}
            className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm transition-all hover:bg-white/10 md:p-5"
          >
            {/* Header de orden */}
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">
                  Orden {order.customer.id}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(order.created_at).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-sm text-gray-400">
                  Método de pago:{' '}
                  <span className="text-gray-200">
                    {order.payment_gateway_names?.join(', ') || 'No disponible'}
                  </span>
                </p>
              </div>

              <div className="relative w-full max-w-xs rounded-lg bg-black/20 p-3 text-sm text-gray-300 shadow-inner">
                <span className="absolute top-2 right-2 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                  {order.financial_status}
                </span>
                <p className="mb-1 font-semibold text-white">
                  Dirección de Envío
                </p>
                <div className="space-y-0.5">
                  <p>
                    {order.shipping_address?.name || 'Nombre no disponible'}
                  </p>
                  <p>
                    {order.shipping_address?.address1 ||
                      'Dirección no disponible'}
                  </p>
                  <p>
                    {order.shipping_address?.city || '-'},{' '}
                    {order.shipping_address?.province || '-'},
                    {order.shipping_address?.zip || '-'}
                  </p>
                  <p>{order.shipping_address?.country || '-'}</p>
                </div>
              </div>
            </div>

            {/* Lista de productos */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-white">
                Productos:
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {order.line_items?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col gap-2 rounded-md bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      {item.variant_title && (
                        <p className="text-xs text-gray-400">
                          Variante: {item.variant_title}
                        </p>
                      )}
                      {item.properties?.length > 0 &&
                        item.properties.map((prop, i) => (
                          <p key={i} className="text-xs text-gray-400">
                            {prop.name}: {prop.value}
                          </p>
                        ))}
                    </div>
                    <div className="text-sm font-medium whitespace-nowrap text-gray-200">
                      {item.quantity} × {item.price} {order.currency}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Envío */}
            {order.shipping_lines?.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-white">
                  Envío:
                </h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {order.shipping_lines.map((ship, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col rounded-md bg-white/5 px-4 py-2 sm:flex-row sm:justify-between"
                    >
                      <span>{ship.title}</span>
                      <span>
                        {ship.price} {order.currency} via {ship.source}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Totales */}
            <div className="flex flex-col border-t border-white/10 pt-3 text-sm text-gray-300 sm:flex-row sm:justify-between">
              <p>
                <span className="font-semibold text-white">Total:</span>{' '}
                {order.total_price} {order.currency}
              </p>
              <p>
                <span className="font-semibold text-white">Estado:</span>{' '}
                {order.cancel_reason ? (
                  <span className="text-red-400">
                    Cancelado - {order.cancel_reason}
                  </span>
                ) : (
                  <span className="text-green-400">Activo</span>
                )}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
