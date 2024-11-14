import { Header } from '@/blocks/Header';
import { Footer } from '@/blocks/Footer';
import React from 'react';
import { SignInForm } from '@/components/SignInForm';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { FirestoreCollections } from '@/models/enums';
import { IConfig } from '@/models/common.model';

export default async function LoginPage() {
  const settingsQuerySnapshot = await getDocs(collection(db, FirestoreCollections.SETTINGS));
  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;

  return (
    <>
      <Header config={config}/>
      <main className="bg-custom-black-1 w-full flex flex-col items-center">
        <SignInForm/>
      </main>
      <Footer config={config}/>
    </>
  );
}
