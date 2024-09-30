'use client';

import { ScrollUpButton } from '@/components/ScrollUpButton';
import { NotificationController } from '@/controllers/notification.controller';
import { PopupController } from '@/controllers/popup.controller';
import { IConfig } from '@/models/common.model';
import { ContactLinkType, PopupIds, RouterLinks } from '@/models/enums';
import { Button } from '@/UI/Button';
import { ContactLink } from '@/UI/ContactLink';
import { ContentContainer } from '@/UI/ContentContainer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IHeaderProps {
  config: IConfig
}

export function Header({ config }: IHeaderProps) {
  const t = useTranslations();
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    if (!document?.[PopupController.NAME]) {
      document[PopupController.NAME] = new PopupController();
    }
    if (!document?.[NotificationController.NAME]) {
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
        popupId: PopupIds.REQUEST_CALL_POPUP_ID,
      });
  };

  return <>
    <ScrollUpButton isScrollTop={isScrollTop} />

    <header className={'z-30 bg-custom-black-2 flex justify-center sticky top-0 ' + (isScrollTop ? '' : 'shadow-lg')}>
      <ContentContainer className="flex justify-between items-center">
        <div className="flex items-center">
          <div className='w-[100px] h-[50px] rounded-sm flex items-center overflow-hidden'>
            <Image src="/icons/logo.svg" width={120} height={20} alt="logo" />
          </div>

        </div>

        <nav className="ml-4">
          <Link href={RouterLinks.VACANCIES}>{t('vacancies')}</Link>
        </nav>

        <div className='flex items-center'>
          <ContactLink className="mr-2" type={ContactLinkType.PHONE} value={config.phone} icon={true} />
          <Button className='px-6 py-1' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
        </div>
      </ContentContainer>
      {/*<Select items={[]}/>*/}
    </header>
  </>
}
