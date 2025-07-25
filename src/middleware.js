import { NextResponse } from 'next/server';

export default function middleware(request) {
  // Simple middleware without Clerk authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|api).*)',
  ],
};
