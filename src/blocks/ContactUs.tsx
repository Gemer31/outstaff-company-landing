'use client'

import { PopupController } from "@/controllers/popup.controller";
import { DomIds } from "@/models/enums";
import { Button } from "@/UI/Button";
import { ContentContainer } from "@/UI/ContentContainer";
import { TitleContainer } from "@/UI/TitleContainer";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function ContactUs() {
    const t = useTranslations();

    const requestCallClick = () => {
        // @ts-expect-error need
        (document[PopupController.NAME] as PopupController)
            .openPopup({
                popupId: DomIds.REQUEST_CALL_POPUP_ID,
            });
    };

    return <article className="w-full flex justify-center bg-custom-black-1 py-10">
        <ContentContainer className="relative">
            <Image className="rotate-12 absolute top-4 right-36" src="/icons/rhomb2.svg" width={60} height={60} alt="Preview" />

            <TitleContainer title={t('contactUs')}>
                <section className="w-full flex flex-col items-center">
                    <div className="mb-4">
                        посчитаем смету и дадим рекомендации по архитектуре.
                    </div>
                    <Button className='px-4 py-2' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
                </section>
            </TitleContainer>
        </ContentContainer>
    </article>
}