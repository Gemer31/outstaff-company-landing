import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t= useTranslations();
  return (
    <>
      <Header/>
      <main>
        {t('contacts')}
      </main>
      <Footer/>
    </>
  );
}
