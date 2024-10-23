import { db } from '@/lib/firebase-config';
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

export function VacanciesEditorForm({
                                      vacancies,
                                      refreshCallback,
                                    }: IVacanciesEditorFormProps) {
  const t = useTranslations();
  const [selectedVacancy, setSelectedVacancy] = useState<IVacancy>(null);
  const [description, setDescription] = useState<string>('');
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
    title?: string;
    experience?: string;
    description: string;
    type: string;
    schedule: string;
    hot: boolean;
  }) => {
    setIsLoading(true);
    const data = {...formData};

    if (!formData.id) {
      data.id = uuidv4();
    }

    try {
      await setDoc(doc(db, FirestoreCollections.VACANCIES, data.id), data);
      setSelectedVacancy(null);
      reset();
      showNotification(t('infoSaved'));
      refreshCallback?.();
    } catch {
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
      console.error('Delete product error: ', e);
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const selectVacancy = (newVacancies: IVacancy[]) => {
    if (newVacancies[0]) {
      setValue('id', newVacancies[0].id);
      setValue('title', newVacancies[0].title);
      setValue('experience', newVacancies[0].experience);
      setValue('hot', newVacancies[0].hot);
      setValue('schedule', newVacancies[0].schedule);
      setValue('type', newVacancies[0].type);
      descriptionChange(newVacancies[0].description);
      setSelectedVacancy(newVacancies[0]);
    } else {
      reset();
      descriptionChange('');
      setSelectedVacancy(newVacancies[0]);
    }
  };

  const descriptionChange = (newValue: string) => {
    setValue('description', newValue);
    setDescription(newValue);
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
      <InputFormField
        className="mt-4"
        required={true}
        placeholder={t('enterTitle')}
        label={t('title')}
        name="title"
        type="text"
        error={errors?.title?.message ? t(errors.title.message) : ''}
        register={register as unknown}
      />
      <InputFormField
        required={true}
        placeholder={t('enterExperience')}
        label={t('experience')}
        name="experience"
        type="text"
        error={errors?.experience?.message ? t(errors.experience.message) : ''}
        register={register as unknown}
      />
      <div className="flex justify-between gap-x-2">
        <SelectFormField
          options={Object.values(JobSchedule).map((item) => t(item))}
          required={true}
          label={t('selectWorkSchedule')}
          name="schedule"
          error={errors?.schedule?.message ? t(errors.schedule.message) : ''}
          register={register as unknown}
        />
        <SelectFormField
          options={Object.values(JobType).map((item) => t(item))}
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
        label={t('description')}
        required={true}
        error={errors?.description?.message ? t(errors.description.message) : ''}
      >
        <TextEditor
          placeholder={t('enterDescription')}
          value={description}
          onChange={descriptionChange}
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
