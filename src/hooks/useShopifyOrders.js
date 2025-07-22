import { useState, useEffect } from 'react';

export default function useShopifyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Handle Clerk user loading safely
  useEffect(() => {
    const loadClerkUser = async () => {
      try {
        // Check if Clerk is available
        const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        const hasValidClerkKey = clerkPublishableKey && clerkPublishableKey.startsWith('pk_') && !clerkPublishableKey.includes('dummy');
        
        if (hasValidClerkKey) {
          // Dynamically import Clerk to avoid build issues
          const { useUser } = await import('@clerk/nextjs');
          // Note: We can't call useUser here because we're in useEffect
          // Instead, we'll handle this through state in the components
          setUser(null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Clerk not available in useShopifyOrders');
        setUser(null);
      }
    };

    loadClerkUser();
  }, []);

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