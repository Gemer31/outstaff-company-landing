import 'animate.css';
import { Raleway } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { RouterLinks } from '@/models/enums';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations();

  return {
    title: `Increment - ${t('mainPreviewTitle')}`,
    verification: {
      google: "tU7Z3851ANvnB-NnNUdGffYHM5TGkjd-S7kqxnuHqCM",
    },
    keywords: [
      'Increment',
      t('outstaff'),
      t('outstaffing'),
      t('outsource'),
      t('outsourcing'),
      t('digitalSolutionsDeveloping'),
      t('internetSolutionsDeveloping'),
      t('outsourceOutstaffService'),
    ],
    // alternates.canonical
    manifest: '/meta/site.webmanifest',
    formatDetection: {
      telephone: false,
    },
    description: `${t('metaMainDescription')}`,
    appleWebApp: {
      title: 'Increment',
    },
    icons: [
      {
        rel: 'image/png',
        url: '/meta/favicon-96x96.png',
        sizes: '96x96',
      },
      {
        rel: 'image/svg+xml',
        url: '/meta/favicon.svg',
      },
      {
        rel: 'apple-touch-icon',
        url: '/meta/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'shortcut icon',
        url: '/meta/favicon.ico',
      },
    ],
    openGraph: {
      title: `Increment - ${t('mainPreviewTitle')}`,
      description: `${t('metaMainDescription')}`,
      url: process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT,
      siteName: 'Increment',
      images: [
        {
          url: '/images/logo-red.png',
          width: 600,
          height: 400,
        },
      ],
      locale: locale === routing.defaultLocale ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  };
}

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export default async function LocaleRootLayout(
  {
    children,
    params: {locale},
  }: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
  }>) {
  let messages;

  try {
    messages = await getMessages();
  } catch {
    redirect(routing.defaultLocale + RouterLinks.HOME);
    return <></>;
  }

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      style={{fontSize: '18px'}}
    >
    <body
      id="page"
      className={`${raleway.className} antialiased flex flex-col justify-center overflow-x-hidden`}
    >
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
