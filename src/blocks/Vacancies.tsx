'use client';

import { VacancyCard } from '@/components/VacancyCard';
import { IConfig, IVacancy } from '@/models/common.model';
import { RouterLinks } from '@/models/enums';
import { ContentContainer } from '@/UI/ContentContainer';
import { SearchInput } from '@/UI/SearchInput';
import { TitleContainer } from '@/UI/TitleContainer';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BlockContainer } from '@/components/BlockContainer';
import Slider from "react-slick";

interface IVacanciesProps {
    config: IConfig;
    vacancies: IVacancy[];
    allVacanciesCount?: number
    detailedView?: boolean;
}

export function Vacancies({allVacanciesCount, vacancies, detailedView, config}: IVacanciesProps) {
    const locale = useLocale();
    const t = useTranslations();
    const [data, setData] = useState(null);

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

    return (data !== null ? <BlockContainer className="bg-custom-black-3">
        <ContentContainer>
            <TitleContainer
                title={t('vacancies')}
                navLink={
                    detailedView
                        ? null
                        : {
                            title: t('allVacancies') + (allVacanciesCount ? ` (${allVacanciesCount})` : ''),
                            url: RouterLinks.VACANCIES
                        }
                }
            >
                {detailedView ? (
                    <SearchInput delay={0} onChange={searchChange}></SearchInput>
                ) : (
                    <></>
                )}
                {data.length
                    ? detailedView || !config.displayVacanciesAsSliderOnMainPage
                        ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                            {data.map((item, index) => (
                                <VacancyCard key={index} data={item}/>
                            ))}
                        </div>
                        : <VacanciesSlider vacancies={data} slideElementsCount={config.vacanciesSlideElementsCount}/>
                    : (
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
    </BlockContainer> : <></>)
}

function VacanciesSlider({ vacancies, slideElementsCount }: {vacancies: IVacancy[];  slideElementsCount: number}) {
    const settings = {
        infinite: true,
        autoplay: true,
        arrows: true,
        slidesToScroll: 1,
        speed: 800,
        autoplaySpeed: 3500,
    }
    return <div className="mx-4">
        <div className="hidden md:block">
            <Slider
                {...settings}
                slidesToShow={slideElementsCount || 3}
            >
                {
                    vacancies.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-1">
                            <VacancyCard data={item}/>
                        </div>
                    ))
                }
            </Slider>
        </div>
        <div className="hidden sm:block md:hidden">
            <Slider
                {...settings}
                slidesToShow={3}
            >
                {
                    vacancies.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-1">
                            <VacancyCard data={item}/>
                        </div>
                    ))
                }
            </Slider>
        </div>
        <div className="sm:hidden">
            <Slider
                {...settings}
                slidesToShow={2}
            >
                {
                    vacancies.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-1">
                            <VacancyCard data={item}/>
                        </div>
                    ))
                }
            </Slider>
        </div>
    </div>
}
