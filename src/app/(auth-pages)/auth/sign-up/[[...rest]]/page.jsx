'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white px-4 pb-20 md:pb-10">
      <div className="w-full max-w-md">
        <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/login" />
      </div>
    </main>
  );
}
