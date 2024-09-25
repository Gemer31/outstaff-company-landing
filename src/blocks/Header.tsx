import { ContentContainer } from '@/UI/ContentContainer';
import { Button } from '@/UI/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Header() {
  const t= useTranslations();

  return <header className="bg-red-700 flex justify-center">
    <ContentContainer className="flex justify-between">
      <Image src="/icons/logo.svg" width={30} height={30}/>
      <Button>{t('requestCall')}</Button>
    </ContentContainer>
    {/*<Select items={[]}/>*/}
  </header>
}
