import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { CONFIG } from '@/constants/stub-data';
import { Popup } from '@/UI/Popup';

export default function VacanciesPage() {
  return (
    <>
      <Popup/>
      <Header config={CONFIG}/>
      <main className="w-full flex flex-col items-center">
        Vacancies
      </main>
      <Footer config={CONFIG}/>
    </>
  );
}
