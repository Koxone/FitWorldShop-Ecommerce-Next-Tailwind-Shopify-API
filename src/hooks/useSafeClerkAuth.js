import { useState, useEffect } from 'react';

export function useSafeClerkAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    try {
      // Check if Clerk is available
      const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      const hasValidClerkKey = clerkPublishableKey && clerkPublishableKey.startsWith('pk_') && !clerkPublishableKey.includes('dummy');
      
      if (hasValidClerkKey) {
        // For safe usage, we'll just return a default state
        // Real Clerk authentication should be handled at the component level
        setIsSignedIn(false);
      } else {
        setIsSignedIn(false);
      }
    } catch (error) {
      console.warn('Clerk not available:', error.message);
      setIsSignedIn(false);
    }
  }, []);
  
  return { isSignedIn };
}