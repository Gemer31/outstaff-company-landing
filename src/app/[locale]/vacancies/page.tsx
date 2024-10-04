import React from 'react';
import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/lib/firebase-config';
import { FirestoreCollections } from '@/models/enums';
import { IConfig } from '@/models/common.model';

export default async function VacanciesPage() {
  const settingsQuerySnapshot = await getDocs(collection(db, FirestoreCollections.SETTINGS));
  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;

  return (
    <>
      <Header config={config}/>
      <main className="w-full flex flex-col items-center">
        Vacancies
      </main>
      <Footer config={config}/>
    </>
  );
}
