import { Customers } from '@/blocks/Customers';
import { Footer } from '@/blocks/Footer';
import { Header } from '@/blocks/Header';
import { Vacancies } from '@/blocks/Vacancies';
import { IConfig } from '@/models/common.model';
import { Popup } from '@/UI/Popup';

const config: IConfig = {
    email: "mail@mail.ru",
    phone: "80291111111"
}

export default function Home() {


  return (
    <>
      <Popup/>
      <Header config={config}/>
      <main className="w-full flex flex-col items-center">
        <Vacancies/>
        <Customers/>
      </main>
      <Footer config={config}/>
    </>
  );
}
