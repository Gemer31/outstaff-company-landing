import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { doc, DocumentData, setDoc, WithFieldValue } from '@firebase/firestore';
import { YupUtil } from '@/utils/yup.util';
import { showNotification } from '@/UI/notification/notification.controller';
import { useTranslations } from 'next-intl';
import { IConfig, IVacancy } from '@/models/common.model';
import { db } from '@/lib/firebase-config';
import { ButtonTypes, FirestoreCollections, FirestoreDocuments } from '@/models/enums';
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
                                      refreshCallback,
                                    }: IVacanciesEditorFormProps) {
  const t = useTranslations();
  const [selectedVacancy, setSelectedVacancy] = useState<IVacancy>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.VacanciesFormSchema),
  });

  const submitForm = async (formData: {
    title?: string;
    experience?: string;
  }) => {
    setIsLoading(true);
    const data: WithFieldValue<DocumentData> = {
      title: formData.title,
      experience: formData.experience,
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

  const deleteVacancy = () => {
    setSelectedVacancy(null);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
      <VacanciesViewer
        selectedVacancy={selectedVacancy}
        deleteVacancyClick={deleteVacancy}
        firestoreVacancies={vacancies}
        editAvailable={true}
        selectVacancyClick={setSelectedVacancy}
      />
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
