import { ContactUs } from '@/blocks/ContactUs';
import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { MainPreview } from '@/blocks/MainPreview';
import { TrustUs } from '@/blocks/TrustUs';
import { Vacancies } from '@/blocks/Vacancies';
import { ContactUsForm } from '@/components/ContactUsForm';
import { CONFIG } from '@/constants/stub-data';
import { Popup } from '@/UI/Popup';

export default function HomePage() {
  return (
    <>
      <Popup/>
      <ContactUsForm config={CONFIG}/>
      <Header config={CONFIG}/>
      <main className="w-full flex flex-col items-center">
        <MainPreview/>
        <Vacancies/>
        <TrustUs/>
        <ContactUs/>
      </main>
      <Footer config={CONFIG}/>
    </>
  );
}
