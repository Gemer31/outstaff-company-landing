import { Header } from '@/blocks/Header';
import { Footer } from '@/blocks/Footer';
import { useTranslations } from 'next-intl';
import { Vacancies } from '@/blocks/Vacancies';
import { Popup } from '@/UI/Popup';
import { Customers } from '@/blocks/Customers';

export default function Home() {
  const t= useTranslations();
  return (
    <>
      <Popup/>
      <Header/>
      <main className="w-full flex flex-col items-center">
        <Vacancies/>
        <Customers/>
        {/*<ContactUsForm/>*/}
      </main>
      <Footer/>
    </>
  );
}
