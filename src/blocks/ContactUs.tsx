'use client'

import { PopupIds } from "@/models/enums";
import { Button } from "@/UI/Button";
import { ContentContainer } from "@/UI/ContentContainer";
import { TitleContainer } from "@/UI/TitleContainer";
import { PopupController } from "@/utils/popup.util";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function ContactUs() {
    const t = useTranslations();

    const requestCallClick = () => {
        // @ts-ignore
        (document[PopupController.NAME] as PopupController)
            .openPopup({
                popupId: PopupIds.REQUEST_CALL_POPUP_ID,
            });
    };

    return <article className="w-full flex justify-center bg-custom-black-1">
        <ContentContainer className="relative">
            <Image className="rotate-12 absolute top-4 right-36" src="/icons/rhomb2.svg" width={60} height={60} alt="Preview" />

            <TitleContainer title={t('contactUs')}>
                <div className="w-full flex justify-center">
                    <Button className='px-4 py-2' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
                </div>
            </TitleContainer>
        </ContentContainer>
    </article>
}