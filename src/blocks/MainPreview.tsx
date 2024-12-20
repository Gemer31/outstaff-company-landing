import { ContentContainer } from '@/UI/ContentContainer';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RouterLinks } from '@/models/enums';
import { Link } from '@/i18n/routing';
import { convertToClass } from '@/utils/convert-to-class.util';
import { BlockContainer } from '@/components/BlockContainer';

interface IMainPreviewProps {
  error?: boolean;
}

const textClass = convertToClass([
  'px-3',
  'max-w-4xl',
  'text-center',
  'z-10',
  'absolute',
  'text-xl md:text-3xl lg:text-4xl'
])

export function MainPreview({error}: IMainPreviewProps) {
  const t = useTranslations();

  return <BlockContainer className="bg-custom-black-1">
    <ContentContainer
      disableVerticalPaddings
      className="flex justify-center items-center overflow-hidden"
    >
      <div className="z-10 w-full h-full main-preview-shadow-vertical absolute top-0 left-0"></div>
      <div className="z-10 w-full h-full main-preview-shadow-gorizontal absolute top-0 left-0"></div>

      {
        error
          ? <>
            <div className={textClass}>
              <div className="mb-4">{t('notFoundPageText')}</div>
              <Link className="hover:underline text-custom-red-1" href={RouterLinks.HOME}>{t('goToMainPage')}</Link>
            </div>
            <Image className="w-full" src="/images/background.png" width={1000} height={1000} alt="Background"/>
          </>
          : <>
          <div className="h-[79vw] xs:h-[74vw] 2xs:h-[51vw] sm:h-[46vw] 2sm:h-[42vw] md:h-[36vw] max-h-[585px]"></div>
            <div className={`${textClass} main-preview-text-focus-in`}>
              <h1>
                <span className="font-bold text-custom-red-1">Increment</span> - {t('mainPreviewTitle')}
              </h1>
            </div>
            <video
                className="max-w-[165%] xs:max-w-[140%] 2xs:max-w-[115%] 2sm:max-w-full"
              playsInline
              rel="auto"
              style={{ position: 'absolute', bottom: 0 }}
              role="application"
              controls={false}
              src="/videos/main-preview.mp4"
              muted
              autoPlay
            >
            </video>
          </>
      }
    </ContentContainer>
  </BlockContainer>
}
