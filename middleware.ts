import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Add debug header to see if session exists
  res.headers.set('x-session-exists', session ? 'true' : 'false');
  
  // If accessing a protected route without a session, redirect to login
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('No session found, redirecting to login');
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing auth pages with a session, redirect to dashboard or the original redirect path
  if (session && (req.nextUrl.pathname.startsWith('/auth/login') || req.nextUrl.pathname.startsWith('/auth/register'))) {
    console.log('Session found, checking for redirect path');
    const redirectedFrom = req.nextUrl.searchParams.get('redirectedFrom');
    const redirectUrl = new URL(redirectedFrom || '/dashboard', req.url);
    console.log('Redirecting to:', redirectUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 