import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { RouterLinks } from '@/models/enums';

export default async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const locale: typeof routing.locales[number] = pathname.split('/')[1] as typeof routing.locales[number];

  if (!routing.locales.includes(locale)) {
    const newUrl = new URL(`/${routing.defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  if (pathname.includes(RouterLinks.EDITOR)) {
    const res = await fetch(
      new URL('/api/is-authenticated', request.url),
      {method: 'GET'},
    );
    const isAuthenticated: boolean = await res.json();

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/${locale}${RouterLinks.HOME}`, request.url));
    }
  }

  const handleI18nRouting = createMiddleware(routing);

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
