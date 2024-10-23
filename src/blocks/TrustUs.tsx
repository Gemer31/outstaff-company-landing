'use client';

import { IConfig, ICustomersBlock, PlainStorageReference } from '@/models/common.model';
import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';
import { InfinitySlider } from '@/UI/Caurusel';
import { getStorageImageSrc } from '@/utils/firebase.util';

interface ITrustUsProps {
  config?: IConfig;
  customerBlockConfig: ICustomersBlock;
  images: PlainStorageReference[];
}

export function TrustUs({customerBlockConfig, images}: ITrustUsProps) {
  const t = useTranslations();
  const getImageUrl = (item) => {
    return getStorageImageSrc(images.find((img) => img.fullPath === item));
  };

  return <article className="w-full flex justify-center bg-custom-black-1 py-10">

    <ContentContainer className="relative">
      <div className="z-10 inner-shadow absolute w-full h-full"></div>
      <TitleContainer title={t('trustUs')}>
        <section className="pb-8 pt-2 w-full flex justify-center">
          <div className="w-3/6 text-center">Наши решения работают в крупнейших компаниях России и мира: Роснефть,
            Россети, Yokohama, Scania, Hoff, Xerox и других.
          </div>
        </section>
        <InfinitySlider
          images={customerBlockConfig.images.map(getImageUrl)}
          slidesToShow={customerBlockConfig.itemsAmountOnPage}
          autoplay={customerBlockConfig.autoplay}
        />
      </TitleContainer>
    </ContentContainer>
  </article>;
}
