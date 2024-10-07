'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { YupUtil } from '@/utils/yup.util';
import { useTranslations } from 'next-intl';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { Button } from '@/UI/banner/Button';
import { ButtonTypes, RouterLinks } from '@/models/enums';
import { showNotification } from '@/UI/notification/notification.controller';
import { useRouter } from '@/i18n/routing';

export function SignInForm() {
  const t = useTranslations();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.SignInSchema),
  });

  const submitForm = useCallback(
    async ({email, password}: { email?: string; password?: string }) => {
      setIsLoading(true);
      try {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        if (res?.ok) {
          router.push(RouterLinks.EDITOR);
        } else {
          console.error('Login failed: ', res?.error);
          showNotification(t('invalidLoginOrPassword'));
          setIsLoading(false);
        }
      } catch {
        showNotification(t('invalidLoginOrPassword'));
      }
    },
    [],
  );

  return (
    <form
      className="bg-custom-black-1 my-10 shadow-custom-red rounded-md p-6 flex flex-col items-center w-6/12"
      onSubmit={handleSubmit(submitForm)}
    >
      <h1 className="text-center text-2xl font-medium">{t('enterOnSite')}</h1>
      <InputFormField
        required
        placeholder="E-mail"
        label="E-mail"
        name="email"
        type="text"
        error={t(errors.email?.message)}
        register={register}
      />
      <InputFormField
        required
        hideValueAvailable
        placeholder={t('password')}
        label={t('password')}
        name="password"
        type="text"
        error={t(errors.password?.message)}
        register={register}
      />
      <Button
        className="text-amber-50 w-full px-4 py-2"
        disabled={isLoading}
        loading={isLoading}
        type={ButtonTypes.SUBMIT}
      >
        {t('enter')}
      </Button>
    </form>
  );
}
