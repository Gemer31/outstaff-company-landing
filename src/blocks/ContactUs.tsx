'use client'

import { PopupIds } from "@/models/enums";
import { Button } from "@/UI/Button";
import { ContentContainer } from "@/UI/ContentContainer";
import { TitleContainer } from "@/UI/TitleContainer";
import { PopupController } from "@/utils/popup.util";
import { useTranslations } from "next-intl";

export function ContactUs() {
    const t = useTranslations();

    const requestCallClick = () => {
        // @ts-ignore
        (document[PopupController.NAME] as PopupController)
            .openPopup({
                popupId: PopupIds.REQUEST_CALL_POPUP_ID,
            });
    };

    return <article>
        <ContentContainer>
            <TitleContainer title={t('contactUs')}>
                <Button className='px-4 py-2' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
            </TitleContainer>
        </ContentContainer>
    </article>
}