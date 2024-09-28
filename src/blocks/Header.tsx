'use client';

import { ContactUsForm } from '@/components/ContactUsForm';
import { IConfig } from '@/models/common.model';
import { PopupIds, RouterLinks } from '@/models/enums';
import { Button } from '@/UI/Button';
import { ContentContainer } from '@/UI/ContentContainer';
import { PopupController } from '@/utils/popup.util';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface IHeaderProps {
  config: IConfig
}

export function Header({ config }: IHeaderProps) {
  const t = useTranslations();

  useEffect(() => {
    if (!document?.[PopupController.NAME]) {
      document[PopupController.NAME] = new PopupController();
    }
  }, []);

  const requestCallClick = () => {
    // @ts-ignore
    (document[PopupController.NAME] as PopupController)
    .openPopup({
      popupId: PopupIds.REQUEST_CALL_POPUP_ID,
    });
  };

  return <header className="bg-custom-black-1 flex justify-center">
    <ContentContainer className="flex justify-between items-center">
      <div className="flex items-center">
        <div className='w-[100px] h-[50px] rounded-sm flex items-center overflow-hidden'>
          <Image src="/icons/logo.svg" width={120} height={20} alt="logo" />
        </div>
        <nav className="ml-4">
          <Link href={RouterLinks.VACANCIES}>{t('vacancies')}</Link>
        </nav>
      </div>
      <div className='flex items-center'>
        <div className='mr-2'>{config.phone}</div>
        <Button className='px-4 py-2' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
      </div>
    </ContentContainer>
    {/*<Select items={[]}/>*/}
  </header>;
}
