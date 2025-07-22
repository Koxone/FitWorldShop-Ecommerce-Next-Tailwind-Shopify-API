'use client';

import useShopifyOrders from '@/hooks/useShopifyOrders';
import { useState, useEffect } from 'react';

export default function OrdersPage() {
  const { orders: shopifyOrders, loading: shopifyLoading, error: shopifyError } = useShopifyOrders();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have Shopify orders, use them
    if (!shopifyLoading) {
      if (shopifyOrders && shopifyOrders.length > 0) {
        setOrders(shopifyOrders);
        setError(shopifyError);
      } else {
        // Fallback to localStorage for demo
        try {
          const storedOrders = localStorage.getItem('userOrders');
          if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
          } else {
            setOrders([]);
          }
        } catch (err) {
          setError('Error loading orders');
        }
      }
      setLoading(false);
    }
  }, [shopifyOrders, shopifyLoading, shopifyError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg 
            className="mx-auto h-12 w-12 text-red-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-400 mb-2">
          Error al cargar los pedidos
        </h3>
        <p className="text-gray-400">
          {error}
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          No tienes pedidos aún
        </h3>
        <p className="text-gray-400">
          Cuando realices tu primera compra, aparecerá aquí
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { color: 'bg-yellow-500 text-yellow-900', text: 'Pendiente' },
      'paid': { color: 'bg-green-500 text-green-900', text: 'Pagado' },
      'fulfilled': { color: 'bg-blue-500 text-blue-900', text: 'Enviado' },
      'cancelled': { color: 'bg-red-500 text-red-900', text: 'Cancelado' },
    };
    
    const config = statusMap[status] || { color: 'bg-gray-500 text-gray-900', text: status };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Mis Pedidos
        </h2>
        <p className="text-gray-400">
          Historial de tus compras y estado de envío
        </p>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id}
            className="p-6 bg-neutral-800 rounded-lg border border-neutral-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Pedido #{order.orderNumber}
                </h3>
                <p className="text-gray-400 text-sm">
                  {formatDate(order.processedAt)}
                </p>
              </div>
              <div className="text-right">
                {getStatusBadge(order.financialStatus)}
                <p className="text-white font-semibold mt-1">
                  ${order.totalPrice?.amount} {order.totalPrice?.currencyCode}
                </p>
              </div>
            </div>
            
            {order.lineItems?.edges && order.lineItems.edges.length > 0 && (
              <div className="border-t border-neutral-700 pt-4">
                <h4 className="text-white font-medium mb-3">Productos:</h4>
                <div className="space-y-2">
                  {order.lineItems.edges.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-300">{item.node.title}</span>
                        <span className="text-gray-400 ml-2">× {item.node.quantity}</span>
                      </div>
                      <span className="text-gray-300">
                        ${item.node.originalTotalPrice?.amount} {item.node.originalTotalPrice?.currencyCode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}