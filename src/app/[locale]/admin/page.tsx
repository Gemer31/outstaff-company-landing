import { Popup } from '@/UI/Popup';
import { Header } from '@/blocks/Header';
import { CONFIG } from '@/constants/stub-data';
import { Footer } from '@/blocks/Footer';
import React from 'react';
import { AdminEditor } from '@/blocks/AdminEditor';

export default function AdminPage() {
  return (
    <>
      <Popup/>
      <Header config={CONFIG}/>
      <main className="bg-custom-black-1 w-full flex flex-col items-center">
        <AdminEditor/>
      </main>
      <Footer config={CONFIG}/>
    </>
  );
}
