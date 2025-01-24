import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const isProduction = process.env.NODE_ENV === 'production';
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: isProduction });
    const { pathname } = req.nextUrl;

    // Log the token for debugging
    console.log("Token:", token);

    // Allow requests if the token exists or the path is for authentication
    if (token || pathname.includes('/signin') || pathname.includes('/api/auth')) {
        return NextResponse.next();
    }

    // Redirect to the sign-in page if no token and trying to access a protected route
    if (!token && pathname !== '/signin') {
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}

export const config = {
    matcher: ['/protected/:path*'], // Protect all routes under /protected
};
