'use client';

import { ScrollUpButton } from '@/components/ScrollUpButton';
import { IConfig } from '@/models/common.model';
import { ContactLinkType, PopupIds, RouterLinks } from '@/models/enums';
import { Button } from '@/UI/Button';
import { ContactLink } from '@/UI/ContactLink';
import { ContentContainer } from '@/UI/ContentContainer';
import { PopupController } from '@/utils/popup.util';
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

    window.onscroll = () => {
      const el = document.documentElement.clientHeight
        ? document.documentElement
        : document.body;

      setIsScrollTop(el.scrollTop === 0);
    };
  }, []);

  const requestCallClick = () => {
    // @ts-ignore
    (document[PopupController.NAME] as PopupController)
      .openPopup({
        popupId: PopupIds.REQUEST_CALL_POPUP_ID,
      });
  };

  return <>
    <ScrollUpButton isScrollTop={isScrollTop}/>

    <header className={'bg-custom-black-2 flex justify-center sticky top-0 ' + (isScrollTop ? '' : 'shadow-lg')}>
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
          <div className='flex items-center mr-2'>
            <Image src="/icons/phone.svg" width={20} height={20} alt={`Phone number: ${config.phone}`} />
            <ContactLink className="ml-2" type={ContactLinkType.PHONE} value={config.phone} />
          </div>
          <Button className='px-6 py-1' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
        </div>
      </ContentContainer>
      {/*<Select items={[]}/>*/}
    </header>
  </>
}
