'use client';

import React from 'react';
import { ScrollUpButton } from '@/components/ScrollUpButton';
import { NotificationController } from '@/controllers/notification.controller';
import { PopupController } from '@/controllers/popup.controller';
import { IConfig } from '@/models/common.model';
import { ContactLinkType, DomIds, RouterLinks } from '@/models/enums';
import { Button } from '@/UI/Button';
import { ContactLink } from '@/UI/ContactLink';
import { ContentContainer } from '@/UI/ContentContainer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import { useEffect, useState } from 'react';

interface IHeaderProps {
  config: IConfig
}

export function Header({ config }: IHeaderProps) {
  const t = useTranslations();
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    // @ts-expect-error need
    if (!document?.[PopupController.NAME]) {
      // @ts-expect-error need
      document[PopupController.NAME] = new PopupController();
    }
    // @ts-expect-error need
    if (!document?.[NotificationController.NAME]) {
      // @ts-expect-error need
      document[NotificationController.NAME] = new NotificationController();
    }

    window.onscroll = () => {
      const el = document.documentElement.clientHeight
        ? document.documentElement
        : document.body;

      setIsScrollTop(el.scrollTop === 0);
    };
  }, []);

  const requestCallClick = () => {
    // @ts-expect-error need
    (document[PopupController.NAME] as PopupController)
      .openPopup({
        popupId: DomIds.REQUEST_CALL_POPUP_ID,
      });
  };

  return <>
    <ScrollUpButton isScrollTop={isScrollTop} />

    <header className={'z-30 bg-custom-black-2 flex justify-center sticky top-0 ' + (isScrollTop ? '' : 'shadow-lg')}>
      <ContentContainer className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={RouterLinks.HOME}>
            <div className="w-[100px] h-[50px] rounded-sm flex items-center overflow-hidden">
              <Image src="/icons/logo.svg" width={120} height={20} alt="logo"/>
            </div>
          </Link>
        </div>

        <nav className="ml-4">
          <Link href={RouterLinks.VACANCIES}>{t('vacancies')}</Link>
        </nav>

        <div className="flex items-center">
        <ContactLink className="mr-2" type={ContactLinkType.PHONE} value={config.phone} icon={true} />
          <Button className='px-6 py-1' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
        </div>
      </ContentContainer>
      {/*<Select items={[]}/>*/}
    </header>
  </>
}
