import { SpecializationCard } from '@/components/SpecializationCard';
import { ISpecializationCard } from '@/models/common.model';
import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';
import { SpecializationCardSize } from '@/models/enums';

const SPECIALIZATIONS: ISpecializationCard[][] = [
  [
    {
      title: 'backend',
      description: 'backendSpecializationDescription',
      icons: [
        'ruby',
        'java',
        'php',
        'laravel',
        'python',
        'dot-net',
      ],
    },
    {
      title: 'frontend',
      description: 'frontendSpecializationDescription',
      icons: [
        'javascript',
        'jquery',
        'angular',
        'react',
        'vue',
        'svelte',
      ],
    },
  ],
  [
    {
      title: 'mobile',
      description: 'mobileSpecializationDescription',
      icons: [
        'swift',
        'kotlin',
        'flutter',
        'nativescript',
      ],
    },
    {
      title: 'qa',
      description: 'qaSpecializationDescription',
      icons: [
        'apache-jmeter',
        'cucumber',
        'protractor',
        'selenium',
      ],
    },
    {
      title: 'analytics',
      description: 'analyticsSpecializationDescription',
      icons: [
        'apache-spark',
        'qlik',
        'sas',
        'tableau',
      ],
    },
  ],
];

export function Specializations() {
  const t = useTranslations();

  return <article className="w-full flex justify-center bg-custom-black-1">
    <ContentContainer className="relative">
      <TitleContainer title={t('specialization')}>
        <div className="flex flex-col gap-4">
          {
            SPECIALIZATIONS.map((blocks, blockIndex) => {
              return <div key={blockIndex} className="flex gap-4">
                {
                  blocks.map((item, index) => {
                    return <SpecializationCard
                      key={index}
                      data={item}
                      size={blockIndex ? SpecializationCardSize.NORMAL : SpecializationCardSize.LARGE}
                    />;
                  })
                }
              </div>
            })
          }
        </div>
      </TitleContainer>
    </ContentContainer>
  </article>;
}
