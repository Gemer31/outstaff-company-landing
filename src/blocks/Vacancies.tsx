'use client';

import { VacancyCard } from '@/components/VacancyCard';
import { IVacancy } from '@/models/common.model';
import { RouterLinks } from '@/models/enums';
import { ContentContainer } from '@/UI/ContentContainer';
import { SearchInput } from '@/UI/SearchInput';
import { TitleContainer } from '@/UI/TitleContainer';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BlockContainer } from '@/components/BlockContainer';

interface IVacanciesProps {
  vacancies: IVacancy[];
  detailedView?: boolean;
}

export function Vacancies({vacancies, detailedView}: IVacanciesProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(vacancies);
  }, [vacancies]);

  const searchChange = (value: string) => {
    const res = vacancies.filter((item) => {
      let {title, experience, description} = item.localization[locale];

      if (!title?.length) {
        title = item.localization?.ru?.title;
      }
      if (!experience?.length) {
        experience = item.localization?.ru?.experience;
      }
      if (!description?.length) {
        description = item.localization?.ru?.description;
      }

      return title.toLowerCase().includes(value.toLowerCase()) ||
        description.toLowerCase().includes(value.toLowerCase()) ||
        experience.toLowerCase().includes(value.toLowerCase()) ||
        item.schedule.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase());
    });
    setData(res);
  };

  return <BlockContainer className="bg-custom-black-3">
    <ContentContainer>
      <TitleContainer
        title={t('vacancies')}
        navLink={
          detailedView
            ? null
            : {title: t('allVacancies'), url: RouterLinks.VACANCIES}
        }
      >
        {detailedView ? (
          <SearchInput delay={0} onChange={searchChange}></SearchInput>
        ) : (
          <></>
        )}

        {data.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
            {data.map((item, index) => (
              <VacancyCard key={index} data={item}/>
            ))}
          </div>
        ) : (
          <div className="flex items-center flex-col py-8">
            <Image
              src="/icons/nothing-found.svg"
              width={80}
              height={80}
              alt="Nothing found"
            />
            {t('nothingFound')}
          </div>
        )}
      </TitleContainer>
    </ContentContainer>
  </BlockContainer>;
}
