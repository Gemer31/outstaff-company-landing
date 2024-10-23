import { ContactUs } from '@/blocks/ContactUs';
import { Footer } from '@/blocks/Footer';
import { InfoInCounts } from '@/blocks/InfoInCounts';
import { MainPreview } from '@/blocks/main-preview/MainPreview';
import { Specializations } from '@/blocks/Specializations';
import { TrustUs } from '@/blocks/TrustUs';
import { Vacancies } from '@/blocks/Vacancies';
import { db, storage } from '@/lib/firebase-config';
import { IConfig, ICounterBlock, ICustomersBlock, IVacancy } from '@/models/common.model';
import { FirestoreCollections } from '@/models/enums';
import { docsToData, getPlainStorageReferences } from '@/utils/firebase.util';
import { collection, getDocs, limit, orderBy, query } from '@firebase/firestore';
import { Header } from '@/blocks/Header';
import { listAll, ref } from '@firebase/storage';

export default async function HomePage() {
  const [
    settingsQuerySnapshot,
    customersBlockQuerySnapshot,
    vacanciesQuerySnapshot,
    counterBlockQuerySnapshot,
  ] = await Promise.all([
    getDocs(collection(db, FirestoreCollections.SETTINGS)),
    getDocs(collection(db, FirestoreCollections.CUSTOMERS_BLOCK)),
    getDocs(
      query(
        collection(db, FirestoreCollections.VACANCIES),
        limit(4),
      ),
    ),
    getDocs(
      query(
        collection(db, FirestoreCollections.COUNTER_BLOCKS),
        orderBy('order'),
      ),
    ),
  ]);
  const images = await listAll(ref(storage));
  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;
  const customersBlockConfig: ICustomersBlock = customersBlockQuerySnapshot.docs[0].data() as ICustomersBlock;
  const vacancies: IVacancy[] = docsToData<IVacancy>(vacanciesQuerySnapshot.docs);
  const counterBlocks: ICounterBlock[] = docsToData<ICounterBlock>(counterBlockQuerySnapshot.docs);

  return (
    <>
      <Header config={config}/>
      <main className="w-full flex flex-col items-center">
        <MainPreview/>
        <Specializations/>
        {config.customersBlockVisible
          ? <TrustUs
            customerBlockConfig={customersBlockConfig}
            images={getPlainStorageReferences(images.items)}
          /> : <></>}
        {config.counterBlocksVisible ? <InfoInCounts counterBlocks={counterBlocks}/> : <></>}
        {vacancies.length ? <Vacancies vacancies={vacancies}/> : <></>}
        <ContactUs/>
      </main>
      <Footer config={config}/>
    </>
  );
}
