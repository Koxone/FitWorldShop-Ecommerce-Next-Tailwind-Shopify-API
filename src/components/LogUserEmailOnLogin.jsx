'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function LogUserEmailOnLogin() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const email = user.emailAddresses?.[0]?.emailAddress;
      console.log('📧 Usuario autenticado con email:', email);
    }
  }, [isSignedIn, user]);

  return null; // No renderiza nada visible
}
