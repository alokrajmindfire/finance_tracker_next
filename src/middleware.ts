import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth(req => {
  const { nextUrl } = req;

  const publicPaths = ['/login', '/register'];
  const commonPaths = ['/docs'];
  const isPublic = publicPaths.includes(nextUrl.pathname);
  const isCommon = commonPaths.includes(nextUrl.pathname);
  const isAuthenticated = !!req.auth;
  if (isCommon) {
    return NextResponse.next();
  }
  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
