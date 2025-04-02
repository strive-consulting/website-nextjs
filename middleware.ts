import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.nextUrl.hostname;

  if (host === 'strive.ae') {
    const url = req.nextUrl.clone();
    url.hostname = 'strivedubai.com';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Match all routes
export const config = {
  matcher: '/:path*',
};