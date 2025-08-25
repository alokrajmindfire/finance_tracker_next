import { auth, signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth(req => {
  const { nextUrl } = req;

  const publicPaths = ['/login', '/register'];

  if (publicPaths.includes(nextUrl.pathname)) {
    const res = NextResponse.next();
    signOut();
    res.cookies.set('next-auth.session-token', '', { expires: new Date(0) });
    res.cookies.set('__Secure-next-auth.session-token', '', {
      expires: new Date(0),
    });
    return res;
  }

  if (!req.auth) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
