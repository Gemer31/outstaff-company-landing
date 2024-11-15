import 'animate.css';
import { Raleway } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { RouterLinks } from '@/models/enums';
import { routing } from '@/i18n/routing';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export default async function LocaleRootLayout({
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
