import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { doc, DocumentData, setDoc, WithFieldValue } from '@firebase/firestore';
import { YupUtil } from '@/utils/yup.util';
import { showNotification } from '@/UI/notification/notification.controller';
import { useTranslations } from 'next-intl';
import { IConfig } from '@/models/common.model';
import { db } from '@/lib/firebase-config';
import { ButtonTypes, FirestoreCollections, FirestoreDocuments } from '@/models/enums';
import { PhoneFormField } from '@/UI/form-fields/PhoneFormField';
import { Button } from '@/UI/banner/Button';
import { InputFormField } from '@/UI/form-fields/InputFormField';

interface GeneralEditorFormProps {
  config: IConfig;
  refreshCallback?: () => void;
}

export function GeneralEditorForm({
                                    config,
                                    refreshCallback,
                                  }: GeneralEditorFormProps) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.GeneralEditorFormSchema),
  });

  useEffect(() => {
    if (config) {
      setValue('email', config.email);
      setValue('phone', config.phone);
    }
  }, [config]);

  const submitForm = async (formData: {
    phone?: string;
    email?: string;
  }) => {
    setIsLoading(true);
    const data: WithFieldValue<DocumentData> = {
      phone: formData.phone,
      email: formData.email,
    };
    try {
      await setDoc(
        doc(db, FirestoreCollections.SETTINGS, FirestoreDocuments.CONFIG),
        data,
      );
      showNotification(t('infoSaved'));
      refreshCallback?.();
    } catch {
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
      <InputFormField
        required
        placeholder="E-mail"
        label="E-mail"
        name="email"
        type="text"
        error={errors?.email?.message ? t(errors.email.message) : ''}
        register={register}
      />
      <PhoneFormField
        label={t('phone')}
        name="phone"
        type="text"
        error={errors?.phone?.message ? t(errors.phone.message) : ''}
        register={register}
      />
      <Button
        className="text-amber-50 w-full py-2"
        disabled={isLoading}
        loading={isLoading}
        type={ButtonTypes.SUBMIT}
      >
        {t('save')}
      </Button>
    </form>
  );
}
