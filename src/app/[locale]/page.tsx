import { Header } from '@/blocks/Header';
import { Footer } from '@/blocks/Footer';
import { useTranslations } from 'next-intl';
import { Vacancies } from '@/blocks/Vacancies';

export default function Home() {
  const t= useTranslations();
  return (
    <>
      <Header/>
      <main className="w-full flex flex-col items-center">
        <Vacancies/>
        {/*<ContactUsForm/>*/}
      </main>
      <Footer/>
    </>
  );
}
