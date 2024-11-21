import { Footer } from "@/blocks/Footer";
import { Header } from "@/blocks/Header";
import { Vacancies } from "@/blocks/Vacancies";
import { db } from "@/lib/firebaseClient";
import { IConfig, IVacancy } from "@/models/common.model";
import { FirestoreCollections } from "@/models/enums";
import { docsToData } from "@/utils/firebase.util";
import { collection, getDocs } from "@firebase/firestore";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Increment - Вакансии',
  description: 'Разработчик digital-решений',
  keywords: ['Increment', 'профессиональные', 'digital-решения', 'Outstaff', 'Вакансии'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT) ,
  openGraph: {
    title: 'Increment - Вакансии',
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
