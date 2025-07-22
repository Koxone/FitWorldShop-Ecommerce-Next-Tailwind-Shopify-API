'use client';

import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { useAuth } from '@/context/Auth/AuthContext';
import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isSignedIn } = useClerkAuth(); // Clerk
  const { setIsLoggedIn } = useAuth(); // Context

  useEffect(() => {
    setIsLoggedIn(isSignedIn);
  }, [isSignedIn, setIsLoggedIn]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/sign-up" />
    </main>
  );
}
