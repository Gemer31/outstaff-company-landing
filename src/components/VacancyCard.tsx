import { Link } from '@/i18n/routing';
import { IVacancy } from '@/models/common.model';
import { RouterLinks } from '@/models/enums';
import { Chip } from '@/UI/Chip';
import { convertToClass } from '@/utils/convert-to-class.util';
import Image from 'next/image';

interface IVacancyCardProps {
  data: IVacancy;
}

const hostClass = convertToClass([
  'cursor-pointer',
  'p-4',
  'rounded-md',
  'bg-custom-black-2',
  'hover:bg-custom-red-2',
  'grow',
  'duration-200 transition-colors',
]);

export function VacancyCard({data}: IVacancyCardProps) {
  return <Link className={hostClass} href={`${RouterLinks.VACANCIES}/${data.id}`}>
    <div className="flex justify-between">
      <h4 className="text-lg font-bold">{data.title}</h4>
      {
        data.hot
          ? <Image src="/icons/fire.svg" width={20} height={20} alt={data.title}/>
          : <></>
      }
    </div>

    <div className="flex items-center gap-x-2 mt-1">
      {
        data.schedule ? <Chip value={data.schedule}/> : <></>
      }
      {
        data.experience ? <Chip value={data.experience}/> : <></>
      }
    </div>
  </Link>
}
