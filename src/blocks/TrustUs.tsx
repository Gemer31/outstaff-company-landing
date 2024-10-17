'use client';

import { IConfig } from '@/models/common.model';
import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';
import { InfinitySlider } from '@/UI/Caurusel';

interface ITrustUsProps {
    config?: IConfig;
}

const IMAGES = [
    "/companies/airbnb.svg",
    "/companies/bmw.svg",
    "/companies/google.svg",
    "/companies/spotify.svg",
    "/companies/tinder.svg",
    "/companies/airbnb.svg",
    "/companies/bmw.svg",
    "/companies/google.svg",
    "/companies/spotify.svg",
    "/companies/tinder.svg",
]

export function TrustUs({  }: ITrustUsProps) {
    const t = useTranslations();

    return <article className="w-full flex justify-center bg-custom-black-1">

        <ContentContainer className="relative">
            <div className="z-10 inner-shadow absolute w-full h-full"></div>
            <TitleContainer title={t('trustUs')}>
                <section className="pb-8 pt-2 w-full flex justify-center">
                    <div className="w-3/6 text-center">Наши решения работают в крупнейших компаниях России и мира: Роснефть, Россети, Yokohama, Scania, Hoff, Xerox и других.</div>
                </section>
                <InfinitySlider images={IMAGES}/>
            </TitleContainer>
        </ContentContainer>
    </article>
}
