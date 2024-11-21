import { Footer } from "@/blocks/Footer";
import { Header } from "@/blocks/Header";
import { db } from "@/lib/firebaseClient";
import { IConfig, IVacancy } from "@/models/common.model";
import { FirestoreCollections } from "@/models/enums";
import { ContentContainer } from "@/UI/ContentContainer";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { convertToClass } from '@/utils/convert-to-class.util';

export interface IVacancyPageProps {
  params: { vacancyId: string };
}

const vacancyMainInfoClass = convertToClass([
  'w-full',
  'sm:w-2/6',
  'flex',
  'flex-row md:flex-col',
  'justify-around items-center',
  'rounded-md',
  'h-fit',
  'shadow-custom-red',
  'bg-custom-black-1',
  'sticky',
  'top-16',
  'text-xl',
  'font-bold',
  'p-2',
  'overflow-hidden',
]);

export default async function VacancyPage({
  params: { vacancyId },
}: IVacancyPageProps) {
  const [settingsQuerySnapshot, vacancyDocumentSnapshot] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
    getDoc(doc(db, FirestoreCollections.VACANCIES, vacancyId)),
  ]);

  const vacancy: IVacancy = vacancyDocumentSnapshot.data() as IVacancy;
  const config: IConfig = settingsQuerySnapshot.docs[0]?.data() as IConfig;

  const t = await getTranslations();

  return (
    <>
      <Header config={config} />
      <main className="w-full flex flex-col items-center bg-custom-black-1">
        <ContentContainer className="w-full py-5">
          <section className="mb-4 flex justify-center items-center">
            <h2 className="text-3xl font-bold text-center">{vacancy.title}</h2>
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

          <article className="px-6 py-4 flex flex-col sm:flex-row gap-4">
            <section className={vacancyMainInfoClass}>
              <div>{t(vacancy.type)}</div>
              <div>{t(vacancy.schedule)}</div>
              <div>{vacancy.experience}</div>

              <Image
                className="absolute bottom-0 right-0"
                src="/icons/triangle.svg"
                width={35}
                height={35}
                alt="Preview"
              />
            </section>

            <section
              className="w-full sm:w-4/6 rounded-md p-4 shadow-custom-red"
              dangerouslySetInnerHTML={{ __html: vacancy?.description || "" }}
            ></section>
          </article>
        </ContentContainer>
      </main>
      <Footer config={config} />
    </>
  );
}
