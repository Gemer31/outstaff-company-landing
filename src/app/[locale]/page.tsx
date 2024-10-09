import { ContactUs } from '@/blocks/ContactUs';
import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { InfoInCounts } from '@/blocks/InfoInCounts';
import { MainPreview } from '@/blocks/MainPreview';
import { Specializations } from '@/blocks/Specializations';
import { TrustUs } from '@/blocks/TrustUs';
import { Vacancies } from '@/blocks/Vacancies';
import { db } from '@/lib/firebase-config';
import { IConfig, IVacancy } from '@/models/common.model';
import { FirestoreCollections } from '@/models/enums';
import { docsToData } from '@/utils/firebase.util';
import { collection, getDocs, limit, query } from '@firebase/firestore';

export default async function HomePage() {
  const [settingsQuerySnapshot, vacanciesQuerySnapshot] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
    getDocs(
      query(
        collection(db, FirestoreCollections.VACANCIES),
        limit(4)
      )
    ),
  ]);
  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;
  const vacancies: IVacancy[] = docsToData<IVacancy>(vacanciesQuerySnapshot.docs)

  return (
    <>
      <Header config={config} />
      <main className="w-full flex flex-col items-center">
        <MainPreview />
        <Specializations />
        <TrustUs />
        <InfoInCounts />
        { vacancies.length ? <Vacancies vacancies={vacancies} /> : <></>}
        <ContactUs />
      </main>
      <Footer config={config} />
    </>
  );
}
