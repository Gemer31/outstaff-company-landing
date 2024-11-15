import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Increment - Интегратор digital-решений для бизнеса и государства',
  description: 'Разработчик портальных решений',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT) ,
  openGraph: {
    title: 'Increment - Интегратор digital-решений для бизнеса и государства',
    description: 'Разработчик портальных решений',
    url: process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT,
    siteName: 'Increment',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT}/images/logo-red.png`,
        width: 800,
        height: 600,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default async function RootLayout({children}) {
  return children;
}
