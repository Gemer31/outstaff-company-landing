import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale: typeof routing.locales[number] = pathname.split('/')[1] as typeof routing.locales[number];

  if (!routing.locales.includes(locale)) {
    const newUrl = new URL(`/${routing.defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  const handleI18nRouting = createMiddleware(routing);

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*']
};
