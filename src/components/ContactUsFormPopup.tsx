"use client";

import { IConfig } from '@/models/common.model';
import { DomIds } from '@/models/enums';
import { Popup } from '@/UI/popup/Popup';
import { closePopup } from '@/UI/popup/popup.controller';
import { useTranslations } from 'next-intl';
import { ContactUsForm } from './ContactUsForm';

interface IContactUsFormProps {
  config: IConfig;
}

export function ContactUsFormPopup({ config }: IContactUsFormProps) {
  const t = useTranslations();
  const submitForm = () => {
    closePopup({ popupId: DomIds.CONTACT_US_POPUP_ID });
  };

  return (
    <Popup id={DomIds.CONTACT_US_POPUP_ID} title={t("contact")}>
      <ContactUsForm config={config} submitCallback={submitForm} />
    </Popup>
  );
}
