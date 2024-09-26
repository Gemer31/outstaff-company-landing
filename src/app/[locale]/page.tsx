import { Customers } from '@/blocks/Customers';
import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { Vacancies } from '@/blocks/Vacancies';
import { Popup } from '@/UI/Popup';

export default function Home() {
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
