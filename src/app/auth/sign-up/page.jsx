'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/login" />
    </main>
  );
}
