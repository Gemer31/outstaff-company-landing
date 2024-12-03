import { Footer } from "@/blocks/Footer";
import { Header } from "@/blocks/Header";
import { ContactUsForm } from "@/components/ContactUsForm";
import { db } from "@/lib/firebaseClient";
import { IConfig } from "@/models/common.model";
import { FirestoreCollections } from "@/models/enums";
import { ContentContainer } from "@/UI/ContentContainer";
import { collection, getDocs } from "@firebase/firestore";
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations();

  return {
    title: `${t('contacts')} - Increment`,
    keywords: [
      'Increment',
      t('contacts'),
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
    description: `${t('contacts')} - Increment`,
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
      title: `${t('contacts')} - Increment`,
      description: `${t('contacts')} - Increment`,
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


export default async function ContactsPage() {
  const [settingsQuerySnapshot] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
  ]);

  const config: IConfig = settingsQuerySnapshot.docs[0]?.data() as IConfig;
  const t = await getTranslations();

  return (
    <>
      <Header config={config} />
      <main className="w-full flex flex-col items-center bg-custom-black-1">
        <ContentContainer className="w-full py-5 flex flex-col 2sm:flex-row justify-between gap-6">
          <section className="w-full 2sm:w-2/6 flex flex-col justify-center gap-4 text-center">
            <h1 className="text-3xl 2sm:text-5xl">{t("connectWith")} <span className="font-bold text-custom-red-1">Increment</span></h1>
            <span className="text-lg 2sm:text-xl">{t("connectUsMessage")}</span>
          </section>
          <section className="w-full 2sm:w-4/6">
            <ContactUsForm config={config} detailedView={true}/>
          </section>
        </ContentContainer>
      </main>
      <Footer config={config} />
    </>
  );
}
