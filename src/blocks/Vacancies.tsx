import { VacancyCard } from '@/components/VacancyCard';
import { STUB_VACANCIES } from '@/constants/stub-data';
import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';

export function Vacancies() {
  const t = useTranslations();

  return <article className='w-full bg-custom-black-1 flex justify-center'>
    <ContentContainer>
      <TitleContainer title={t('vacancies')}>
        <div className='flex justify-between gap-x-2'>
        {
          STUB_VACANCIES.map((item, index) => {
            return <VacancyCard key={index} data={item} />
          })
        }
        </div>

      </TitleContainer>
    </ContentContainer>
  </article>
}
