import { ContentContainer } from '@/UI/ContentContainer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BlockContainer } from '@/components/BlockContainer';
import { TitleContainerHeadline } from '@/UI/TitleContainerHeadline';

export function AboutUs() {
  const t = useTranslations();

  return <BlockContainer className="bg-custom-black-1">
    <ContentContainer disableHorizontalPaddings disableVerticalPaddings>
      <div className="relative w-full flex flex-row-reverse">
        <div className="absolute top-0 left-0 w-full h-full p-2">
          <div className="w-full md:w-7/12 text-center md:text-left h-full flex flex-col justify-center items-center">
            <TitleContainerHeadline>{t('aboutUs')}</TitleContainerHeadline>
            <p className="relative z-20 text-base md:text-lg lg:text-xl mt-3">
              {t('aboutUsDescription')}
            </p>
          </div>
        </div>

        <div className="relative w-fit opacity-35 md:opacity-100">
          <Image className="min-w-[1000px]" width={1000} height={1000} src="/images/about-us.jpg" alt="About us"/>
          <div className="hidden md:block z-10 w-full h-full absolute top-0 left-0 about-us-background-shadow"></div>
        </div>
      </div>
    </ContentContainer>
  </BlockContainer>
}
