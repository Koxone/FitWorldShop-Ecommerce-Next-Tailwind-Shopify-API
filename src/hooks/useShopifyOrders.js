import { useState, useEffect } from 'react';

export default function useShopifyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safe useUser hook call
  let user = null;
  try {
    const { useUser } = require('@clerk/nextjs');
    const userHook = useUser();
    user = userHook.user;
  } catch (error) {
    // Clerk not available
    console.log('Clerk not available in useShopifyOrders');
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user has a Shopify customer access token
        // In a real implementation, this would be stored in user metadata
        const accessToken = user?.publicMetadata?.shopifyAccessToken;
        
        if (!accessToken) {
          // If no access token, show empty state
          setOrders([]);
          return;
        }

        const response = await fetch('/api/auth/get-orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        });

        if (!response.ok) {
          throw new Error('Error fetching orders');
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    error,
  };
}