import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { doc, DocumentData, setDoc, WithFieldValue } from '@firebase/firestore';
import { YupUtil } from '@/utils/yup.util';
import { NotificationController } from '@/components/notification/notification.controller';
import { useTranslations } from 'next-intl';
import { IConfig, IVacancy } from '@/models/common.model';
import { db } from '@/lib/firebase-config';
import { ButtonTypes, FirestoreCollections, FirestoreDocuments, JobType } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { VacanciesViewer } from '@/components/VacanciesViewer';
import { InputFormField } from '@/UI/form-fields/InputFormField';

interface IVacanciesEditorFormProps {
  vacancies: IVacancy[];
  config: IConfig;
  refreshCallback?: () => void;
}

export function VacanciesEditorForm({
                                      vacancies,
  config,
  refreshCallback,
}: IVacanciesEditorFormProps) {
  const t = useTranslations();
  const [selectedVacancy, setSelectedVacancy] = useState<IVacancy>(null);
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

  const deleteVacancy = (v: IVacancy) => {
    setSelectedVacancy(null);
    setValue('phone', config.phone);
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
      <VacanciesViewer
        selectedVacancy={selectedVacancy}
        deleteVacancyClick={deleteVacancy}
        firestoreVacancies={vacancies}
        editAvailable={true}
        selectVacancyClick={setSelectedVacancy}
        />
      {/*id: '2',*/}
      {/*type: JobType.DEVELOPER,*/}
      {/*description: "",*/}
      {/*hot: false,*/}
      <InputFormField
        required={true}
        placeholder={t('enterTitle')}
        label={t('title')}
        name="title"
        type="text"
        error={t(errors.title?.message)}
        register={register as unknown}
      />
      <InputFormField
        required={true}
        placeholder={t('enterExperience')}
        label={t('experience')}
        name="experience"
        type="text"
        error={t(errors.experience?.message)}
        register={register as unknown}
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
