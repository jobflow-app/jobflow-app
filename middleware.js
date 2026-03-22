import { NextResponse } from 'next/server'

const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/update-password',
  '/auth/confirm',
  '/auth/confirmed',
]

export function middleware(request) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

  const hasSbAccessToken =
    request.cookies.get('sb-access-token') ||
    request.cookies.get('sb-qakwsvqrxgvvcvpvpvik-auth-token')

  if (isPublic) {
    return NextResponse.next()
  }

  if (!hasSbAccessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/superadmin/:path*',
    '/dashboard/:path*',
    '/worker/:path*',
    '/clients/:path*',
    '/jobs/:path*',
    '/invoices/:path*',
    '/map/:path*',
    '/settings/:path*',
  ],
}
