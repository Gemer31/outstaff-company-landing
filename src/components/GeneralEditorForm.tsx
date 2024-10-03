import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { doc, DocumentData, setDoc, WithFieldValue } from '@firebase/firestore';
import { YupUtil } from '@/utils/yup.util';
import { NotificationController } from '@/controllers/notification.controller';
import { useTranslations } from 'next-intl';
import { IConfig } from '@/models/common.model';
import { db } from '@/lib/firebase-config';
import { ButtonTypes, FirestoreCollections, FirestoreDocuments } from '@/models/enums';
import { PhoneFormField } from '@/UI/form-fields/PhoneFormField';
import { Button } from '@/UI/Button';

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
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.GeneralEditorFormSchema),
  });

  useEffect(() => {
    if (config) {
      setValue('phone', config.phone);
    }
  }, [config]);

  const submitForm = async (formData: {
    phone?: string;
    workingHours?: string;
    currency?: string;
    shopDescription?: string;
    deliveryDescription?: string;
    shopRegistrationDescription?: string;
  }) => {
    setIsLoading(true);
    const data: WithFieldValue<DocumentData> = {
      contactPhone: formData.phone,
      workingHours: formData.workingHours,
      currency: formData.currency,
      shopDescription: formData.shopDescription,
      deliveryDescription: formData.deliveryDescription,
      shopRegistrationDescription: formData.shopRegistrationDescription,
    };
    try {
      await setDoc(
        doc(db, FirestoreCollections.SETTINGS, FirestoreDocuments.CONFIG),
        data
      );
      (document[NotificationController.NAME] as NotificationController).showNotification(t('infoSaved'));
      refreshCallback?.();
    } catch {
      (document[NotificationController.NAME] as NotificationController).showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
      <PhoneFormField
        label={t('phone')}
        name="phone"
        type="text"
        error={t(errors.phone?.message)}
        register={register}
      />
      <Button
        styleClass="text-amber-50 w-full py-2"
        disabled={isLoading}
        loading={isLoading}
        type={ButtonTypes.SUBMIT}
      >
        {t('save')}
      </Button>
    </form>
  );
}
