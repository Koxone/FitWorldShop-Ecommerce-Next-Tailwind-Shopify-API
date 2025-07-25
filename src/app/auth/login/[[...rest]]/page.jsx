'use client';

import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { useAuth } from '@/context/AuthDEPRECATED/AuthContext';
import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isSignedIn } = useClerkAuth();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    setIsLoggedIn(isSignedIn);
  }, [isSignedIn, setIsLoggedIn]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 pb-20 text-white md:pb-10">
      <div className="w-full max-w-md">
        <SignIn path="/auth/login" routing="path" signUpUrl="/auth/sign-up" />
      </div>
    </main>
  );
}
