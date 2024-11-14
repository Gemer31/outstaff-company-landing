'use client';

import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { RouterLinks } from '@/models/enums';

export default function NotFound() {
  redirect(routing.defaultLocale + RouterLinks.HOME);

  return <></>;
}
