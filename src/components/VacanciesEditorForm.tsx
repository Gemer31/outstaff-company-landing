import { db } from '@/lib/firebaseClient';
import { IConfig, IVacancy } from '@/models/common.model';
import { ButtonTypes, FirestoreCollections, JobSchedule, JobType } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { FormFieldWrapper } from '@/UI/form-fields/FormFieldWrapper';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { SelectFormField } from '@/UI/form-fields/SelectFormField';
import { showNotification } from '@/UI/notification/notification.controller';
import { TextEditor } from '@/UI/TextEditor';
import { YupUtil } from '@/utils/yup.util';
import { deleteDoc, doc, setDoc } from '@firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListViewer } from '@/components/ListViewer';

interface IVacanciesEditorFormProps {
  vacancies: IVacancy[];
  config: IConfig;
  refreshCallback?: () => void;
}

export function VacanciesEditorForm(
  {
    vacancies,
    refreshCallback,
  }: IVacanciesEditorFormProps) {
  const t = useTranslations();
  const [selectedVacancy, setSelectedVacancy] = useState<IVacancy>(null);
  const [descriptionRu, setDescriptionRu] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.VacanciesFormSchema),
  });

  const submitForm = async (formData: {
    id?: string;
    titleRu?: string;
    titleEn?: string;
    experienceRu?: string;
    experienceEn?: string;
    descriptionRu: string;
    descriptionEn: string;
    type: string;
    schedule: string;
    hot: boolean;
  }) => {
    setIsLoading(true);
    const data: IVacancy = {
      id: formData.id,
      type: formData.type as JobType,
      schedule: formData.schedule as JobSchedule,
      hot: formData.hot,
      order: null,
      localization: {
        ru: {
          title: formData.titleRu,
          experience: formData.experienceRu,
          description: formData.descriptionRu,
        },
        en: {
          title: formData.titleEn,
          experience: formData.experienceEn,
          description: formData.descriptionEn || null,
        },
      },
    };

    if (formData.id) {
      data.order = selectedVacancy.order;
    } else {
      data.id = uuidv4();
      data.order = vacancies.length + 1;
    }

    try {
      await setDoc(doc(db, FirestoreCollections.VACANCIES, data.id), data);
      setSelectedVacancy(null);
      reset();
      showNotification(t('infoSaved'));
      refreshCallback?.();
    } catch (e) {
      console.error('Save vacancy error: ', e);
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVacancy = async (deletedVacancy: IVacancy) => {
    setIsLoading(true);

    try {
      await deleteDoc(
        doc(db, FirestoreCollections.VACANCIES, deletedVacancy.id),
      );
      setSelectedVacancy(null);
      showNotification(t('deletedSuccessfully'));
      reset();
      refreshCallback?.();
    } catch (e) {
      console.error('Delete vacancy error: ', e);
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const selectVacancy = (newVacancies: IVacancy[]) => {
    if (newVacancies[0]) {
      setValue('id', newVacancies[0].id);
      setValue('hot', newVacancies[0].hot);
      setValue('schedule', newVacancies[0].schedule);
      setValue('type', newVacancies[0].type);
      setValue('titleRu', newVacancies[0].localization?.ru?.title);
      setValue('titleEn', newVacancies[0].localization?.en?.title);
      setValue('experienceRu', newVacancies[0].localization?.ru?.experience);
      setValue('experienceEn', newVacancies[0].localization?.en?.experience);
      descriptionRuChange(newVacancies[0].localization?.ru?.description);
      descriptionEnChange(newVacancies[0].localization?.en?.description);
      setSelectedVacancy(newVacancies[0]);
    } else {
      reset();
      descriptionRuChange('');
      descriptionEnChange('');
      setSelectedVacancy(newVacancies[0]);
    }
  };

  const descriptionRuChange = (newValue: string) => {
    const v = newValue || '';
    setValue('descriptionRu', v);
    setDescriptionRu(v);
  };
  const descriptionEnChange = (newValue: string) => {
    const v = newValue || '';
    setValue('descriptionEn', v);
    setDescriptionEn(v);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
      <ListViewer
        editAvailable
        selectedItems={selectedVacancy ? [selectedVacancy] : []}
        items={vacancies}
        deleteItemClick={deleteVacancy}
        selectItemClick={selectVacancy}
        propsMapper={{
          idProp: 'id',
          itemTitle: {prop: 'title'},
        }}
        newItemText={t('newVacancy')}
        emptyText={t('noVacancies')}
      />

      <div className="flex justify-between gap-x-2">
        <InputFormField
          className="mt-4"
          required={true}
          placeholder={`${t('enterTitle')} (ru)`}
          label={`${t('title')} (ru)`}
          name="titleRu"
          type="text"
          error={errors?.titleRu?.message ? t(errors.titleRu.message) : ''}
          register={register as unknown}
        />
        <InputFormField
          className="mt-4"
          placeholder={`${t('enterTitle')} (en)`}
          label={`${t('title')} (en)`}
          name="titleEn"
          type="text"
          error={errors?.titleEn?.message ? t(errors.titleEn.message) : ''}
          register={register as unknown}
        />
      </div>

      <div className="flex justify-between gap-x-2">
        <InputFormField
          required={true}
          placeholder={`${t('enterExperience')} (ru)`}
          label={`${t('experience')} (ru)`}
          name="experienceRu"
          type="text"
          error={errors?.experienceRu?.message ? t(errors.experienceRu.message) : ''}
          register={register as unknown}
        />
        <InputFormField
          placeholder={`${t('enterExperience')} (en)`}
          label={`${t('experience')} (en)`}
          name="experienceEn"
          type="text"
          error={errors?.experienceEn?.message ? t(errors.experienceEn.message) : ''}
          register={register as unknown}
        />
      </div>

      <div className="flex justify-between gap-x-2">
        <SelectFormField
          options={Object.values(JobSchedule).map((item) => ({id: item, localizedName: t(item)}))}
          required={true}
          label={t('selectWorkSchedule')}
          name="schedule"
          error={errors?.schedule?.message ? t(errors.schedule.message) : ''}
          register={register as unknown}
        />
        <SelectFormField
          options={Object.values(JobType).map((item) => ({id: item, localizedName: t(item)}))}
          required={true}
          label={t('selectVacancy')}
          name="type"
          error={errors?.type?.message ? t(errors.type.message) : ''}
          register={register as unknown}
        />
        <InputFormField
          placeholder={t('hotVacancy')}
          label={t('hotVacancy')}
          name="hot"
          type="checkbox"
          error={errors?.hot?.message ? t(errors.hot.message) : ''}
          register={register as unknown}
        />
      </div>
      <FormFieldWrapper
        label={`${t('description')} (ru)`}
        required={true}
        error={errors?.descriptionRu?.message ? t(errors.descriptionRu.message) : ''}
      >
        <TextEditor
          placeholder={`${t('enterDescription')} (ru)`}
          value={descriptionRu}
          onChange={descriptionRuChange}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        label={`${t('description')} (en)`}
        error={errors?.descriptionEn?.message ? t(errors.descriptionEn.message) : ''}
      >
        <TextEditor
          placeholder={`${t('enterDescription')} (en)`}
          value={descriptionEn}
          onChange={descriptionEnChange}
        />
      </FormFieldWrapper>
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
