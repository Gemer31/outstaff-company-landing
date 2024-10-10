"use client";

import { IConfig } from "@/models/common.model";
import { DomIds } from "@/models/enums";
import { showNotification } from "@/UI/notification/notification.controller";
import { Popup } from "@/UI/popup/Popup";
import { closePopup } from "@/UI/popup/popup.controller";
import { useTranslations } from "next-intl";
import { ContactUsForm } from "./ContactUsForm";

interface IContactUsFormProps {
  config: IConfig;
}

export function ContactUsFormPopup({ config }: IContactUsFormProps) {
  const t = useTranslations();
  const submitForm = () => {
    closePopup({ popupId: DomIds.REQUEST_CALL_POPUP_ID });
    showNotification(t("ourManagersCallYou"));
  };

  return (
    <Popup id={DomIds.REQUEST_CALL_POPUP_ID} title={t("requestCall")}>
      <ContactUsForm config={config} submitCallback={submitForm} />
    </Popup>
  );
}
