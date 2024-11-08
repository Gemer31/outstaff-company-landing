import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { doc, setDoc } from '@firebase/firestore';
import { YupUtil } from '@/utils/yup.util';
import { showNotification } from '@/UI/notification/notification.controller';
import { useTranslations } from 'next-intl';
import { IConfig } from '@/models/common.model';
import { db } from '@/lib/firebase-config';
import { ButtonTypes, FirestoreCollections, FirestoreDocuments } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { FormFieldWrapper } from '@/UI/form-fields/FormFieldWrapper';
import { TextEditor } from '@/UI/TextEditor';

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
      setValue('counterBlocksVisible', config.counterBlocksVisible);
      setValue('customersBlockVisible', config.customersBlockVisible);
      setValue('telegramLink', config.telegramLink);
      companyInfoChange(config.companyInfo);
    }
  }, [config]);

  const submitForm = async (formData: {
    email?: string;
    companyInfo?: string;
    counterBlocksVisible?: boolean;
    customersBlockVisible?: boolean;
  }) => {
    setIsLoading(true);
    try {
      await setDoc(
        doc(db, FirestoreCollections.SETTINGS, FirestoreDocuments.CONFIG),
        formData,
      );
      showNotification(t('infoSaved'));
      refreshCallback?.();
    } catch {
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  const companyInfoChange = (v: string) => {
    setValue('companyInfo', v);
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
      <InputFormField
        required
        placeholder="Telegram"
        label="Telegram"
        name="telegramLink"
        type="text"
        error={errors?.telegramLink?.message ? t(errors.telegramLink.message) : ''}
        register={register}
      />
      <FormFieldWrapper
        required
        label={t('companyInfo')}
        error={errors?.companyInfo?.message ? t(errors.companyInfo.message) : ''}
      >
        <TextEditor
          placeholder={t('enterCompanyInfo')}
          value={config.companyInfo}
          onChange={companyInfoChange}
        />
      </FormFieldWrapper>
      <div className="flex justify-around">
        <InputFormField
          inLine
          label={t('counterBlocksVisible')}
          name="counterBlocksVisible"
          type="checkbox"
          error={t(errors.counterBlocksVisible?.message)}
          register={register}
        />
        <InputFormField
          inLine
          label={t('customersBlockVisible')}
          name="customersBlockVisible"
          type="checkbox"
          error={t(errors.customersBlockVisible?.message)}
          register={register}
        />
      </div>
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
