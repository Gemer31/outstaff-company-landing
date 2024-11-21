import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { FirestoreCollections } from '@/models/enums';
import { IConfig } from '@/models/common.model';
import { Header } from '@/blocks/Header';
import { MainPreview } from '@/blocks/MainPreview';
import { Footer } from '@/blocks/Footer';

export default async function NotFound() {
  const settingsQuerySnapshot = await getDocs(collection(db, FirestoreCollections.SETTINGS));
  const config: IConfig = settingsQuerySnapshot.docs[0]?.data() as IConfig;

  return <>
    <Header config={config}/>
    <main className="w-full flex flex-col items-center">
      <MainPreview error/>
    </main>
    <Footer config={config}/>
  </>
}
