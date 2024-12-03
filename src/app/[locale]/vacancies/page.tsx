import { Footer } from "@/blocks/Footer";
import { Header } from "@/blocks/Header";
import { Vacancies } from "@/blocks/Vacancies";
import { db } from "@/lib/firebaseClient";
import { IConfig, IVacancy } from "@/models/common.model";
import { FirestoreCollections } from "@/models/enums";
import { docsToData } from "@/utils/firebase.util";
import { collection, getDocs } from "@firebase/firestore";
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations();

  return {
    title: `${t('vacancies')} - Increment`,
    description: `${t('vacancies')} - Increment`,
    keywords: [
      'Increment',
      t('vacancies'),
      t('outstaff'),
      t('outstaffing'),
      t('outsource'),
      t('outsourcing'),
      t('digitalSolutionsDeveloping'),
      t('internetSolutionsDeveloping'),
      t('outsourceOutstaffService'),
    ],
    manifest: '/meta/site.webmanifest',
    formatDetection: {
      telephone: false,
    },
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
      title: `${t('vacancies')} - Increment`,
      description: `${t('vacancies')} - Increment`,
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

export default async function VacanciesPage() {
  const [settingsQuerySnapshot, vacanciesQuerySnapshot] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
    getDocs(collection(db, FirestoreCollections.VACANCIES)),
  ]);

  const config: IConfig = settingsQuerySnapshot.docs[0]?.data() as IConfig;
  const vacancies: IVacancy[] = docsToData<IVacancy>(
    vacanciesQuerySnapshot.docs
  );

  return (
    <>
      <Header config={config} />
      <main className="w-full flex flex-col items-center">
        <Vacancies vacancies={vacancies} detailedView={true}/>
      </main>
      <Footer config={config} />
    </>
  );
}
