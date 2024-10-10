import "animate.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Increment - Интегратор digital-решений для бизнеса и государства",
  description: "Разработчик портальных решений",
  openGraph: {
    title: 'Increment - Интегратор digital-решений для бизнеса и государства',
    description: 'Разработчик портальных решений',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: '/icons/logo.svg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      // @ts-expect-error need
      style={{ "font-size": "18px" }}
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
