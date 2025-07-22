import { useState, useEffect } from 'react';

export function useSafeClerkAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    try {
      // Check if Clerk is available
      const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      const hasValidClerkKey = clerkPublishableKey && clerkPublishableKey.startsWith('pk_') && !clerkPublishableKey.includes('dummy');
      
      if (hasValidClerkKey) {
        // Dynamically import and use Clerk
        import('@clerk/nextjs').then(({ useAuth }) => {
          try {
            const auth = useAuth();
            setIsSignedIn(auth?.isSignedIn || false);
          } catch (error) {
            console.warn('Clerk auth error:', error.message);
            setIsSignedIn(false);
          }
        }).catch(() => {
          setIsSignedIn(false);
        });
      }
    } catch (error) {
      console.warn('Clerk not available:', error.message);
      setIsSignedIn(false);
    }
  }, []);
  
  return { isSignedIn };
}