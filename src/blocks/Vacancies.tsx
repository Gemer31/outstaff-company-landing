import { ContentContainer } from '@/UI/ContentContainer';
import { STUB_VACANCIES } from '@/constants/stub-data';
import { VacancyCard } from '@/components/VacancyCard';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';

export function Vacancies() {
  const t= useTranslations();

  return <ContentContainer>
    <TitleContainer title={t('vacancies')}>
      {
        STUB_VACANCIES.map((item) => {
          return <VacancyCard data={item}/>
        })
      }
    </TitleContainer>
  </ContentContainer>
}
