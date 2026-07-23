// Next.js Middleware to protect /admin/* routes
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to admin login
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_session')?.value;
    const adminRole = request.cookies.get('user_role')?.value;

    // Check if admin session cookie or claim exists
    if (!adminToken || adminRole !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'unauthorized_access');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
