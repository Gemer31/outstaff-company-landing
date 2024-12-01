import { Link } from '@/i18n/routing';
import { IVacancy } from '@/models/common.model';
import { RouterLinks } from '@/models/enums';
import { Chip } from '@/UI/Chip';
import { convertToClass } from '@/utils/convert-to-class.util';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface IVacancyCardProps {
  data: IVacancy;
}

const hostClass = convertToClass([
  'relative',
  'flex flex-col items-center justify-center',
  'cursor-pointer',
  'p-4',
  'rounded-md',
  'bg-custom-black-2',
  'hover:bg-custom-red-2',
  'grow',
  'duration-200 transition-colors',
]);

export function VacancyCard({data}: IVacancyCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  let {title, experience} = data.localization[locale];

  if (!title?.length) {
    title = data.localization?.ru?.title;
  }
  if (!experience?.length) {
    experience = data.localization?.ru?.experience;
  }

  return <Link className={hostClass} href={`${RouterLinks.VACANCIES}/${data.id}`}>
    {
      data.hot
        ? <Image className="absolute right-1.5 top-1.5" src="/icons/fire.svg" width={20} height={20} alt={title}/>
        : <></>
    }

    <h4 className="text-lg font-bold text-center">{title}</h4>

    <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
      {
        data.schedule ? <Chip value={t(data.schedule)}/> : <></>
      }
      {
        experience ? <Chip value={experience}/> : <></>
      }
    </div>
  </Link>;
}
