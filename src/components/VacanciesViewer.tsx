import Image from 'next/image';
import { useEffect, useState } from 'react';
import { convertToClass } from '@/utils/convert-to-class.util';
import { IVacancy } from '@/models/common.model';
import { useTranslations } from 'next-intl';
import { EditorsSearch } from '@/components/EditorsSearch';

interface IVacanciesViewerProps {
  selectedVacancy?: IVacancy;
  firestoreVacancies: IVacancy[];
  editAvailable?: boolean;
  deleteVacancyClick?: (vacancy: IVacancy) => void;
  selectVacancyClick?: (vacancy: IVacancy) => void;
}

const itemClass = convertToClass([
  'cursor-pointer',
  'flex',
  'justify-between',
  'items-center',
  'px-2',
  'py-1',
]);

export function VacanciesViewer({
                                  firestoreVacancies,
                                  editAvailable,
                                  selectVacancyClick,
                                  deleteVacancyClick,
                                  selectedVacancy,
                                }: IVacanciesViewerProps) {
  const t = useTranslations();
  const [chosenVacancy, setChosenVacancy] = useState<IVacancy>();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setChosenVacancy(selectedVacancy);
  }, [selectedVacancy]);

  const selectCategory = (category: IVacancy) => {
    setChosenVacancy(category);
    selectVacancyClick?.(category);
  };

  return (
    <>
      {!firestoreVacancies?.length && !editAvailable ? (
        <div className="w-full text-center rounded-md border-custom-red-1 border-2 px-2 py-1">
          {t('noVacancies')}
        </div>
      ) : (
        <div className="overflow-auto max-h-48 w-full rounded-md border-custom-red-1 border-2">
          <EditorsSearch onChange={setSearchValue}/>
          <div className="px-2 py-1">
            {editAvailable ? (
              <div
                onClick={() => selectCategory(undefined)}
                key="new"
                className={`cursor-pointer flex justify-between items-center px-2 py-1 ${!chosenVacancy ? 'rounded-md bg-custom-red-1' : ''}`}
              >
                <span>{t('newVacancy')}</span>
              </div>
            ) : (
              <></>
            )}
            {(searchValue
                ? firestoreVacancies.filter((item) =>
                  item.title.toLowerCase().includes(searchValue.toLowerCase()),
                )
                : firestoreVacancies
            )?.map((item) => (
              <div
                onClick={() => selectCategory(item)}
                key={item.id}
                className={`${itemClass} ${chosenVacancy?.id === item.id ? 'rounded-md bg-pink-300' : ''}`}
              >
                <span>{item.title}</span>
                {editAvailable ? (
                  <Image
                    onClick={() => deleteVacancyClick?.(item)}
                    width={30}
                    height={30}
                    src="/icons/cross.svg"
                    alt="Close"
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
