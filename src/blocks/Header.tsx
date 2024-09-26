'use client';

import { ContentContainer } from '@/UI/ContentContainer';
import { Button } from '@/UI/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PopupContext } from '@/utils/popup.util';
import { ContactUsForm } from '@/components/ContactUsForm';

export function Header() {
  const t = useTranslations();

  const requestCallClick = () => {
    (document['popupContext'] as PopupContext).openPopup(
      t('requestCall'),
      <ContactUsForm translateContext={t}/>,
    );
  };

  return <header className="bg-red-700 flex justify-center">
    <ContentContainer className="flex justify-between">
      <Image src="/icons/logo.svg" width={30} height={30}/>
      <Button callback={requestCallClick}>{t('requestCall')}</Button>
    </ContentContainer>
    {/*<Select items={[]}/>*/}
  </header>;
}
