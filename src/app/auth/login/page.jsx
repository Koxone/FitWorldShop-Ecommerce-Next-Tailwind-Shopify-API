'use client';
import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/sign-up" />
    </main>
  );
}
