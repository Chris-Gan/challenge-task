import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
  return NextResponse.redirect(
    new URL('/stocks/au/market-cap-large', request.url),
  );
}

export const config = {
  matcher: ['/', '/stocks', '/stocks/:country'],
};
