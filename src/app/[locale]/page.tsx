import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { MainPreview } from '@/blocks/MainPreview';
import { Vacancies } from '@/blocks/Vacancies';
import { CONFIG } from '@/constants/stub-data';
import { Popup } from '@/UI/Popup';


export default function HomePage() {


  return (
    <>
      <Popup/>
      <Header config={CONFIG}/>
      <main className="w-full flex flex-col items-center">
        <MainPreview/>
        <Vacancies/>
        {/* <Customers/> */}
      </main>
      <Footer config={CONFIG}/>
    </>
  );
}
