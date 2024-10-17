"use client";

import { DomIds } from "@/models/enums";
import { Button } from "@/UI/banner/Button";
import { ContentContainer } from "@/UI/ContentContainer";
import { openPopup } from "@/UI/popup/popup.controller";
import { TitleContainer } from "@/UI/TitleContainer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export function ContactUs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const t = useTranslations();

  const requestCallClick = () => {
    openPopup({
      popupId: DomIds.REQUEST_CALL_POPUP_ID,
    });
  };

  return (
    <article className="w-full flex justify-center bg-custom-black-1 py-10">
      <ContentContainer className="relative main-preview-shadow-gorizontal">
        <Image
          ref={ref}
          className={
            "rotate-12 absolute top-4 right-36 " +
            (inView ? "roll-in-right" : "")
          }
          src="/icons/rhomb2.svg"
          width={60}
          height={60}
          alt="Preview"
        />

        <TitleContainer title={t("contactUs")}>
          <section className="w-full flex flex-col items-center">
            <div className="mb-4">
              посчитаем смету и дадим рекомендации по архитектуре.
            </div>
            <Button
              className="px-4 py-2"
              loading={false}
              callback={requestCallClick}
            >
              {t("requestCall")}
            </Button>
          </section>
        </TitleContainer>
      </ContentContainer>
    </article>
  );
}
