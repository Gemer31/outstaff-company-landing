import { Header } from '@/blocks/Header';
import { Footer } from '@/blocks/Footer';
import React from 'react';
import { AdminEditor } from '@/blocks/AdminEditor';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/lib/firebase-config';
import { FirestoreCollections } from '@/models/enums';
import { IConfig } from '@/models/common.model';

export default async function EditorPage() {
  const settingsQuerySnapshot = await getDocs(collection(db, FirestoreCollections.SETTINGS));
  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;

  return (
    <>
      <Header config={config}/>
      <main className="bg-custom-black-1 w-full flex flex-col items-center">
        <AdminEditor/>
      </main>
      <Footer config={config}/>
    </>
  );
}
