'use client';

import { ContentContainer } from '@/UI/ContentContainer';
import { Button } from '@/UI/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PopupContext } from '@/utils/popup.util';
import { ContactUsForm } from '@/components/ContactUsForm';
import { PopupIds } from '@/UI/Popup';
import { IConfig } from '@/models/common.model';

interface IHeaderProps {
  config: IConfig
}

export function Header({ config }: IHeaderProps) {
  const t = useTranslations();

  const requestCallClick = () => {
    (document[PopupIds.CONTENT] as PopupContext).openPopup(
      t('requestCall'),
      <ContactUsForm translateContext={t} />,
    );
  };

  return <header className="bg-main-black-1 flex justify-center">
    <ContentContainer className="flex justify-between items-center">
      <div className='w-[100px] h-[50px] rounded-sm flex items-center overflow-hidden'>
        <Image src="/icons/logo.svg" width={120} height={20} />
      </div>
      <div className='flex items-center'>
        <div className='mr-2'>{config.phone}</div>
        <Button className='px-4 py-2' loading={false} callback={requestCallClick}>{t('requestCall')}</Button>
      </div>
    </ContentContainer>
    {/*<Select items={[]}/>*/}
  </header>;
}
