'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/Auth/AuthContext';

/**
 * Component to sync Clerk authentication state with local auth context
 * This component is wrapped with ClerkProvider so it can safely use Clerk hooks
 */
export default function ClerkAuthSync() {
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const syncClerkAuth = async () => {
      try {
        const { useAuth: useClerkAuth } = await import('@clerk/nextjs');
        const clerkAuth = useClerkAuth();
        
        if (clerkAuth.isSignedIn !== undefined) {
          setIsLoggedIn(clerkAuth.isSignedIn);
        }
      } catch (error) {
        console.warn('Clerk auth sync not available:', error);
        // Fallback to local auth only
      }
    };

    syncClerkAuth();
  }, [setIsLoggedIn]);

  return null; // This component doesn't render anything
}