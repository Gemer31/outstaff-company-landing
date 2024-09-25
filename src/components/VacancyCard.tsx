import { IVacancy } from '@/constants/stub-data';
import Image from 'next/image';

interface IVacancyCardProps {
  data: IVacancy;
}

export function VacancyCard({data}: IVacancyCardProps) {
  return <div className="flex justify-between p-4 rounded-md border-2">
    <h4>{data.title}</h4>
    {
      data.hot
        ? <Image src="/icons/fire.svg" width={20} height={20}/>
        : <></>
    }
  </div>;
}
