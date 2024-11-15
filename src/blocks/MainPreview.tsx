import { ContentContainer } from '@/UI/ContentContainer';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RouterLinks } from '@/models/enums';
import { Link } from '@/i18n/routing';
import { convertToClass } from '@/utils/convert-to-class.util';

interface IMainPreviewProps {
  error?: boolean;
}

const textClass = convertToClass([
  'px-2',
  'max-w-2xl',
  'text-center',
  'z-10',
  'absolute',
  'text-xl md:text-2xl lg:text-3xl'
])

export function MainPreview({error}: IMainPreviewProps) {
  const t = useTranslations();

  return (
    <article className="w-full flex justify-center bg-custom-black-1 relative">
      <ContentContainer className="flex justify-center items-center relative  overflow-hidden">
        <div className="z-10 w-full h-full main-preview-shadow-vertical absolute top-0 left-0"></div>
        <div className="z-10 w-full h-full main-preview-shadow-gorizontal absolute top-0 left-0"></div>

        <Image className="invisible" src="/images/background.png" width={1000} height={1000} alt="Background"/>

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
              <div className={`${textClass} main-preview-text-focus-in`}>
                <span className="font-bold text-custom-red-1">Increment</span> - Интегратор
                digital-решений для бизнеса и государства
              </div>
              <video
                className="absolute bottom-0"
                role="application"
                src="/videos/main-preview.mp4"
                muted
                autoPlay
              >
                <source src="/videos/main-preview.mp4"/>
              </video>
            </>
        }
      </ContentContainer>
    </article>
  );
}
