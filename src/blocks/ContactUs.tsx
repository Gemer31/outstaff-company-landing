"use client";

import { DomIds } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { ContentContainer } from '@/UI/ContentContainer';
import { openPopup } from '@/UI/popup/popup.controller';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export function ContactUs() {
  const t = useTranslations();
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const requestCallClick = () => {
    openPopup({
      popupId: DomIds.CONTACT_US_POPUP_ID,
    });
  };

  return (
    <article className="w-full flex justify-center bg-custom-black-3 py-10">
      <ContentContainer className="relative">
        <Image
          className="rotate-12 absolute bottom-2 right-28"
          src="/icons/rhomb2.svg"
          width={60}
          height={60}
          alt="Preview"
        />
        <Image
          className=" absolute top-4 left-28"
          src="/icons/rhomb.svg"
          width={60}
          height={60}
          alt="Preview"
        />

        <TitleContainer title={t("contactUs")}>
          <section className="w-full flex flex-col items-center">
            <div className="mb-4 text-lg">
              {t('staffProjectForThreeDays')}
            </div>
            <div ref={ref} className={(inView ? 'wobble-hor-bottom' : '')}>
              <Button
                className={'px-4 py-2'}
                loading={false}
                callback={requestCallClick}
              >
                {t("contact")}
              </Button>
            </div>
          </section>
        </TitleContainer>
      </ContentContainer>
    </article>
  );
}
