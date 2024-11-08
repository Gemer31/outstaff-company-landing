"use client";

import { VacancyCard } from "@/components/VacancyCard";
import { IVacancy } from "@/models/common.model";
import { RouterLinks } from "@/models/enums";
import { ContentContainer } from "@/UI/ContentContainer";
import { SearchInput } from "@/UI/SearchInput";
import { TitleContainer } from "@/UI/TitleContainer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IVacanciesProps {
  vacancies: IVacancy[];
  detailedView?: boolean;
}

export function Vacancies({ vacancies, detailedView }: IVacanciesProps) {
  const t = useTranslations();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(vacancies);
  }, [vacancies]);

  const searchChange = (value: string) => {
    const res = vacancies.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.experience.toLowerCase().includes(value.toLowerCase()) ||
        item.schedule.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase())
    );
    setData(res);
  };

  return (
    <article className="w-full bg-custom-black-3 flex justify-center py-10">
      <ContentContainer>
        <TitleContainer
          title={t("vacancies")}
          navLink={
            detailedView
              ? null
              : { title: t("allVacancies"), url: RouterLinks.VACANCIES }
          }
        >
          {detailedView ? (
            <SearchInput delay={0} onChange={searchChange}></SearchInput>
          ) : (
            <></>
          )}

          {data.length ? (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {data.map((item, index) => (
                <VacancyCard key={index} data={item} />
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
              {t("nothingFound")}
            </div>
          )}
        </TitleContainer>
      </ContentContainer>
    </article>
  );
}
