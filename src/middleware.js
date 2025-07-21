import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/auth/login',
  '/auth/sign-up',
  '/auth/login/sso-callback',
]);

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
