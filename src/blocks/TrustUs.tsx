'use client'

import { IConfig } from "@/models/common.model";
import { ContentContainer } from "@/UI/ContentContainer";
import { CustomBanner } from "@/UI/CustomBanner";
import { TitleContainer } from "@/UI/TitleContainer";
import { useTranslations } from "next-intl";

interface ITrustUsProps {
    config?: IConfig;
}

const IMAGES = [
    "/companies/airbnb.svg",
    "/companies/bmw.svg",
    "/companies/google.svg",
    "/companies/spotify.svg",
    "/companies/tinder.svg",
]

export function TrustUs({config}: ITrustUsProps) {
    const t = useTranslations();

    return <article className="flex justify-center">

        <ContentContainer>
            <TitleContainer title={t('trustUs')}>

                <CustomBanner images={IMAGES}/>
            </TitleContainer>
        </ContentContainer>
    </article>
}