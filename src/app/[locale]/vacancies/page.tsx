import { Footer } from "@/blocks/Footer";
import { Header } from "@/blocks/Header";
import { Vacancies } from "@/blocks/Vacancies";
import { db } from "@/lib/firebaseClient";
import { IConfig, IVacancy } from "@/models/common.model";
import { FirestoreCollections } from "@/models/enums";
import { docsToData } from "@/utils/firebase.util";
import { collection, getDocs } from "@firebase/firestore";

export default async function VacanciesPage() {
  const [settingsQuerySnapshot, vacanciesQuerySnapshot] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
    getDocs(collection(db, FirestoreCollections.VACANCIES)),
  ]);

  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;
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
