import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { db } from '@/lib/firebaseClient';
import { IConfig, IVacancy } from '@/models/common.model';
import { FirestoreCollections } from '@/models/enums';
import { ContentContainer } from '@/UI/ContentContainer';
import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { convertToClass } from '@/utils/convert-to-class.util';
import { Metadata } from 'next';
import { Props } from 'next/script';
import { notFound } from 'next/navigation';
import * as sanitizeHtml from 'sanitize-html';

export async function generateMetadata(
  // @ts-expect-error need
  {params}: Props,
): Promise<Metadata> {
  // read route params
  const id = (await params).vacancyId;
  const locale = await getLocale();
  const vacancyDocumentSnapshot = await getDoc(doc(db, FirestoreCollections.VACANCIES, id));
  const vacancy: IVacancy = vacancyDocumentSnapshot.data() as IVacancy;

  if (!vacancy) {
    notFound();
  }
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `Increment - ${vacancy?.localization?.[locale]?.title}`,
    description: vacancy?.localization?.[locale]?.description,
    keywords: ['Increment', 'digital-решения', 'Outstaff', 'Вакансия', vacancy?.localization?.[locale]?.title],
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT),
    openGraph: {
      title: 'Increment - Интегратор digital-решений для бизнеса и государства',
      description: 'Разработчик портальных решений',
      url: process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT,
      siteName: 'Increment',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT}/images/logo-red.png`,
          width: 600,
          height: 400,
        },
      ],
      locale,
      type: 'website',
    },
  };
}

export interface IVacancyPageProps {
  params: { vacancyId: string };
}

const vacancyMainInfoSectionClass = convertToClass([
  'overflow-hidden',
  'relative md:sticky md:top-16',
  'shadow-custom-red',
  'rounded-md',
  'flex justify-center items-center',
  'w-full md:w-2/6 max-h-20 md:max-h-40',
]);

const vacancyMainInfoClass = convertToClass([
  'h-full w-full',
  'flex-row md:flex-col',
  'gap-2',
  'absolute top-0 left-0',
  'font-bold text-xl md:text-2xl',
  'flex flex-wrap justify-around md:justify-center items-center',
  'z-10',
  'p-2',
]);

export default async function VacancyPage({params: {vacancyId}}: IVacancyPageProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const [settingsQuerySnapshot, vacancyDocumentSnapshot] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
    getDoc(doc(db, FirestoreCollections.VACANCIES, vacancyId)),
  ]);

  const vacancy: IVacancy = vacancyDocumentSnapshot.data() as IVacancy;
  const config: IConfig = settingsQuerySnapshot.docs[0]?.data() as IConfig;

  if (!vacancy) {
    notFound();
  }

  let {title, experience, description} = vacancy.localization[locale];

  if (!title?.length) {
    title = vacancy.localization?.ru?.title;
  }
  if (!experience?.length) {
    experience = vacancy.localization?.ru?.experience;
  }
  if (!description?.length) {
    description = vacancy.localization?.ru?.description;
  }

  // @ts-expect-error need
  description = description?.length ? sanitizeHtml(description) : '';

  return (
    <>
      <Header config={config}/>
      <main className="w-full flex flex-col items-center bg-custom-black-1">
        <ContentContainer className="w-full py-5">
          <section className="mb-4 flex justify-center items-center">
            <h1 className="text-3xl font-bold text-center">{title}</h1>
            {vacancy.hot ? (
              <Image
                className="ml-2"
                src="/icons/fire.svg"
                width={35}
                height={35}
                alt="Hot vacancy"
              />
            ) : (
              <></>
            )}
          </section>

          <article className="px-6 py-4 flex flex-col md:flex-row gap-4">
            <section className={vacancyMainInfoSectionClass}>
              <div className={vacancyMainInfoClass}>
                <div className="h-fit">{t(vacancy.type)}</div>
                <div className="h-fit">{t(vacancy.schedule)}</div>
                <div className="h-fit">{experience}</div>
              </div>

              <div className="h-full w-full top-0 left-0 flex justify-center items-center bg-white opacity-5">
                <Image
                  src={`/images/vacancies/${vacancy.type}.png`}
                  width={500}
                  height={500}
                  alt={vacancy.type}
                />
              </div>

              <Image
                className="absolute bottom-0 right-0"
                src="/icons/triangle.svg"
                width={35}
                height={35}
                alt="Preview"
              />
            </section>

            <section className="w-full md:w-4/6 rounded-md shadow-custom-red relative">
              <div className="w-full h-full absolute top-0 left-0 bg-white opacity-5 overflow-hidden"></div>
              <div className="p-4 z-10" dangerouslySetInnerHTML={{__html: description}}></div>
            </section>
          </article>
        </ContentContainer>
      </main>
      <Footer config={config}/>
    </>
  );
}
