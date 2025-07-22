'use client';

import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { useAuth } from '@/context/Auth/AuthContext';
import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isSignedIn } = useClerkAuth(); 
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    setIsLoggedIn(isSignedIn);
  }, [isSignedIn, setIsLoggedIn]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white px-4 pb-20 md:pb-10">
      <div className="w-full max-w-md">
        <SignIn path="/auth/login" routing="path" signUpUrl="/auth/sign-up" />
      </div>
    </main>
  );
}
