import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { APP_LOCALES } from '@/constants/common.constant';

export const routing = defineRouting({
  locales: [APP_LOCALES.RUSSIAN, APP_LOCALES.ENGLISH],
  defaultLocale: APP_LOCALES.RUSSIAN,
});

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation(routing);
