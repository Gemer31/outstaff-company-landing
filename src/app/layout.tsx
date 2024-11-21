import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Increment - профессиональные digital-решения',
  description: 'Разработчик digital-решений',
  keywords: ['Increment', 'профессиональные', 'digital-решения', 'Outstaff'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT) ,
  openGraph: {
    title: 'Increment - профессиональные digital-решения',
    description: 'Разработчик digital-решений',
    url: process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT,
    siteName: 'Increment',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT}/images/logo-red.png`,
        width: 600,
        height: 400,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default async function RootLayout({children}) {
  return children;
}
