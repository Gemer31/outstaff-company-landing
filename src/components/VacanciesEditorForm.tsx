import { VacanciesViewer } from "@/components/VacanciesViewer";
import { db } from "@/lib/firebase-config";
import { IConfig, IVacancy } from "@/models/common.model";
import {
  ButtonTypes,
  FirestoreCollections,
  JobSchedule,
  JobType
} from "@/models/enums";
import { Button } from "@/UI/banner/Button";
import { FormFieldWrapper } from "@/UI/form-fields/FormFieldWrapper";
import { InputFormField } from "@/UI/form-fields/InputFormField";
import { SelectFormField } from "@/UI/form-fields/SelectFormField";
import { showNotification } from "@/UI/notification/notification.controller";
import { TextEditor } from "@/UI/TextEditor";
import { YupUtil } from "@/utils/yup.util";
import { deleteDoc, doc, DocumentData, setDoc, WithFieldValue } from "@firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(YupUtil.VacanciesFormSchema),
  });

  const submitForm = async (formData: {
    title?: string;
    experience?: string;
    description: string;
    type: string;
    schedule: string;
    hot: boolean;
  }) => {
    setIsLoading(true);
    const data: WithFieldValue<DocumentData> = {
      id: uuidv4(),
      title: formData.title,
      experience: formData.experience,
      description: formData.description,
      type: formData.type,
      schedule: formData.schedule,
      hot: formData.hot,
    };
    try {
      await setDoc(doc(db, FirestoreCollections.VACANCIES, data.id), data);
      setSelectedVacancy(null);
      reset();
      showNotification(t("infoSaved"));
      refreshCallback?.();
    } catch {
      showNotification(t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVacancy = async (deletedVacancy: IVacancy) => {
    setIsLoading(true);

    try {
      await deleteDoc(
        doc(db, FirestoreCollections.VACANCIES, deletedVacancy.id)
      );
      setSelectedVacancy(null);
      showNotification(t("deletedSuccessfully"));
      reset();
      refreshCallback?.();
    } catch (e) {
      console.error('Delete product error: ', e);
      showNotification(t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const selectVacancy = (newVacancy: IVacancy) => {
    if (newVacancy) {
      setValue("title", newVacancy.title);
      setValue("experience", newVacancy.experience);
      setValue("hot", newVacancy.hot);
      setValue("schedule", newVacancy.schedule);
      setValue("type", newVacancy.type);
      descriptionChange(newVacancy.description);
      setSelectedVacancy(newVacancy);
    } else {
      reset();
      descriptionChange('');
    }
  }

  const descriptionChange = (newValue: string) => {
    setValue("description", newValue);
    setDescription(newValue);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
      <VacanciesViewer
        selectedVacancy={selectedVacancy}
        deleteVacancyClick={deleteVacancy}
        firestoreVacancies={vacancies}
        editAvailable={true}
        selectVacancyClick={selectVacancy}
      />
      <InputFormField
        required={true}
        placeholder={t("enterTitle")}
        label={t("title")}
        name="title"
        type="text"
        error={t(errors.title?.message)}
        register={register as unknown}
      />
      <InputFormField
        required={true}
        placeholder={t("enterExperience")}
        label={t("experience")}
        name="experience"
        type="text"
        error={t(errors.experience?.message)}
        register={register as unknown}
      />
      <div className="flex justify-between gap-x-2">
        <SelectFormField
          options={Object.values(JobSchedule).map((item) => t(item))}
          required={true}
          label={t("selectWorkSchedule")}
          name="schedule"
          error={t(errors.schedule?.message)}
          register={register as unknown}
        />
        <SelectFormField
          options={Object.values(JobType).map((item) => t(item))}
          required={true}
          label={t("selectWorkSchedule")}
          name="type"
          error={t(errors.type?.message)}
          register={register as unknown}
        />
        <InputFormField
          placeholder={t("hotVacancy")}
          label={t("hotVacancy")}
          name="hot"
          type="checkbox"
          error={t(errors.hot?.message)}
          register={register as unknown}
        />
      </div>
      <FormFieldWrapper
        label={t("description")}
        required={true}
        error={errors.description?.message}
      >
        <TextEditor
          placeholder={t("enterDescription")}
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
        {t("save")}
      </Button>
    </form>
  );
}
