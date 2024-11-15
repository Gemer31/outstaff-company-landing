import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BlockContainer } from '@/components/BlockContainer';

export function AboutUs() {
  const t = useTranslations();

  return <BlockContainer classname="bg-custom-black-1">
    <ContentContainer>
      <TitleContainer title={t('aboutUs')}>
        <div className="w-full flex flex-row-reverse relative">
          <p className="w-6/12 absolute flex items-center left-0 top-0 bottom-0 z-20 text-xl">
            {t('aboutUsDescription')}
          </p>
          <div className="relative w-fit">
            <Image className="rounded-lg" width={1000} height={1000} src="/images/about-us.jpg" alt="About us"/>
            <div className="z-10 w-full h-full absolute top-0 left-0 about-us-background-shadow"></div>
          </div>
        </div>
      </TitleContainer>
    </ContentContainer>
  </BlockContainer>
}
