import { IVacancy } from '@/constants/stub-data';
import { convertToClass } from '@/utils/convert-to-class.util';
import Image from 'next/image';

interface IVacancyCardProps {
  data: IVacancy;
}

const hostClass = convertToClass([
  'cursor-pointer',
  'p-4',
  'flex',
  'justify-between',
  'rounded-md',
  'border-2',
  'border-custom-red-2',
  'hover:bg-custom-red-2',
  'grow'
])


export function VacancyCard({ data }: IVacancyCardProps) {
  return <div className={hostClass}>
    <h4 className='color-custom-red-1'>{data.title}</h4>
    {
      data.hot
        ? <Image src="/icons/fire.svg" width={20} height={20} />
        : <></>
    }
  </div>;
}
