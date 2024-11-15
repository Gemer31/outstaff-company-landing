"use client";

import React, { useEffect, useState } from 'react';
import { ScrollUpButton } from '@/components/ScrollUpButton';
import { openPopup, PopupController } from '@/UI/popup/popup.controller';
import { IConfig } from '@/models/common.model';
import { ContactLinkType, DomIds, RouterLinks } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { ContentContainer } from '@/UI/ContentContainer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { SessionProvider } from 'next-auth/react';
import { HeaderAuthActions } from '@/components/HeaderAuthActions';
import { Notification } from '@/UI/notification/Notification';
import { Popup } from '@/UI/popup/Popup';
import { ContactUsFormPopup } from '@/components/ContactUsFormPopup';
import { LINK_CLASS } from '@/constants/common.constant';
import { ContactLink } from '@/UI/ContactLink';
import { convertToClass } from '@/utils/convert-to-class.util';

interface IHeaderProps {
  config: IConfig;
}

const headerClass = convertToClass([
  'py-1',
  'z-30',
  'bg-custom-black-2',
  'flex',
  'justify-center',
  'sm:text-base md:text-md lg:text-lg',
  'sticky',
  'top-0',
]);

export function Header({ config }: IHeaderProps) {
  const t = useTranslations();
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    if (!document?.[PopupController.NAME]) {
      document[PopupController.NAME] = new PopupController();
    }

    window.onscroll = () => {
      const el = document.documentElement.clientHeight
        ? document.documentElement
        : document.body;

      setIsScrollTop(el.scrollTop === 0);
    };
  }, []);

  const requestCallClick = () => {
    openPopup({
      popupId: DomIds.CONTACT_US_POPUP_ID,
    });
  };

  return (
    <>
      <Notification />
      <Popup />
      <ContactUsFormPopup config={config} />
      <ScrollUpButton isScrollTop={isScrollTop} />

      <header className={`${headerClass} ${(isScrollTop ? "" : "shadow-lg")}`}>
        <ContentContainer className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={RouterLinks.HOME}>
              <div className="block">
                <Image
                  src="/images/logo.png"
                  width={75}
                  height={75}
                  alt="logo"
                />
              </div>
            </Link>
            <nav className="ml-4 flex gap-4">
              <Link className={LINK_CLASS} href={RouterLinks.VACANCIES}>{t("vacancies")}</Link>
              <Link className={LINK_CLASS} href={RouterLinks.CONTACTS}>{t("contacts")}</Link>
            </nav>
          </div>

          <div className="flex items-center">
            <ContactLink
              className="mr-2"
              type={ContactLinkType.MAIL}
              value={config.email}
              iconVisible={true}
            />
            <Button
              className="px-6 py-1"
              loading={false}
              callback={requestCallClick}
            >
              {t("contact")}
            </Button>
            <SessionProvider>
              <HeaderAuthActions />
            </SessionProvider>
          </div>
        </ContentContainer>
      </header>
    </>
  );
}
