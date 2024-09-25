'use client'

import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';
import { useTranslations } from 'next-intl';
import { Button } from '@/UI/Button';
import { YupUtil } from '@/utils/yup.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function ContactUsForm() {
  const t= useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.ContactUsFormSchema),
  });

  const sendClick = () => {

  }

  return <ContentContainer>
    <TitleContainer title={t('connectWithUs')}>
      <form onSubmit={sendClick}>
        <Button >{t('send')}</Button>
      </form>
    </TitleContainer>
  </ContentContainer>
}
