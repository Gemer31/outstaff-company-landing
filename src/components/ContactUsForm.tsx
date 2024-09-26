'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/UI/Button';
import { YupUtil } from '@/utils/yup.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface IContactUsFormProps {
  translateContext: unknown
}

export function ContactUsForm({translateContext}: IContactUsFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.ContactUsFormSchema),
  });

  const sendClick = () => {

  };

  return <form onSubmit={sendClick}>
    <Button>{translateContext('send')}</Button>
  </form>;
}
