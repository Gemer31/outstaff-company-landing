import React from 'react';
import { ContactUs } from '@/blocks/ContactUs';
import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { InfoInCounts } from '@/blocks/InfoInCounts';
import { MainPreview } from '@/blocks/MainPreview';
import { Specializations } from '@/blocks/Specializations';
import { TrustUs } from '@/blocks/TrustUs';
import { Vacancies } from '@/blocks/Vacancies';
import { ContactUsForm } from '@/components/ContactUsForm';
import { Notification } from '@/components/notification/Notification';
import { Popup } from '@/UI/Popup';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/lib/firebase-config';
import { FirestoreCollections } from '@/models/enums';
import { IConfig } from '@/models/common.model';

export default async function HomePage() {
  const settingsQuerySnapshot = await getDocs(collection(db, FirestoreCollections.SETTINGS));
  const config: IConfig = settingsQuerySnapshot.docs[0].data() as IConfig;

  return (
    <>
      <Header config={config} />
      <main className="w-full flex flex-col items-center">
        <MainPreview />
        <Specializations />
        <TrustUs />
        <InfoInCounts />
        <Vacancies />
        <ContactUs />
      </main>
      <Footer config={config} />
    </>
  );
}
