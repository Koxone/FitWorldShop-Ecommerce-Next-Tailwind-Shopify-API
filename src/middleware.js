import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default function middleware(request) {
  // Check if Clerk keys are available
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const hasValidClerkKey = clerkPublishableKey && clerkPublishableKey.startsWith('pk_') && !clerkPublishableKey.includes('dummy');
  
  if (!hasValidClerkKey) {
    // Skip Clerk middleware if keys are not available
    return NextResponse.next();
  }
  
  // Use Clerk middleware if keys are available
  return clerkMiddleware()(request);
}

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|auth/login.*|auth/sign-up.*).*)',
  ],
};
