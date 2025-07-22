import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|auth/login.*|auth/sign-up.*).*)',
  ],
};
