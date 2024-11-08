'use client';

import { IConfig } from '@/models/common.model';
import { ButtonTypes, ContactLinkType } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { ContactLink } from '@/UI/ContactLink';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { TextareaFormField } from '@/UI/form-fields/TextareaFormField';
import { YupUtil } from '@/utils/yup.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { showNotification } from '@/UI/notification/notification.controller';

interface IContactUsFormProps {
  config: IConfig;
  detailedView?: boolean;
  submitCallback?: () => void;
}

export function ContactUsForm({
                                config,
                                detailedView,
                                submitCallback,
                              }: IContactUsFormProps) {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(
      detailedView
        ? YupUtil.ContactUsFormDetailedSchema
        : YupUtil.ContactUsFormSchema,
    ),
  });

  const submitForm = async (formData: {
    yourOrCompanyName?: string;
    phone?: string;
    message?: string;
    email?: string;
  }) => {
    let message: string = `Запрос\n\nИмя: ${formData.yourOrCompanyName}`;
    if (formData.phone?.length) {
      message += `;\nТелефон: ${formData.phone}`;
    }
    if (formData.email?.length) {
      message += `;\nEmail: ${formData.email}`;
    }
    if (formData.message?.length) {
      message += `;\nКомментарий: ${formData.message}`;
    }
    await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_ENDPOINT}/api/bot`, {
      method: 'POST',
      body: JSON.stringify({message: encodeURI(message)}),
    });
    reset();
    showNotification(t("ourManagersCallYou"));
    submitCallback?.();
  };

  return (
    <>
      {detailedView ? (
        <>
          <div className="flex gap-x-2">
            <ContactLink
              valueVisible={false}
              type={ContactLinkType.TELEGRAM}
              value={config.telegramLink}
            />
            |
            <ContactLink
              className="ml-2"
              type={ContactLinkType.MAIL}
              value={config.email}
              iconVisible={true}
            />
          </div>

          <div className="separator my-4"></div>
        </>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(submitForm)}>
        <InputFormField
          required
          placeholder={t('yourOrCompanyName')}
          label={t('yourOrCompanyName')}
          type="text"
          name="yourOrCompanyName"
          error={errors?.yourOrCompanyName?.message ? t(errors.yourOrCompanyName.message) : ''}
          register={register}
        />
        {/*<PhoneFormField*/}
        {/*  required={true}*/}
        {/*  label={t('phone')}*/}
        {/*  type="text"*/}
        {/*  name="phone"*/}
        {/*  error={errors?.phone?.message ? t(errors.phone.message) : ''}*/}
        {/*  register={register}*/}
        {/*/>*/}
        <InputFormField
          required
          placeholder="Email"
          label="Email"
          name="email"
          type="text"
          error={errors?.email?.message ? t(errors.email.message) : ''}
          register={register}
        />
        {detailedView ? (
          <>

            <TextareaFormField
              placeholder={t('enterMessage')}
              label={t('message')}
              name="message"
              // @ts-expect-error need
              error={errors?.message?.message ? t(errors.message.message) : ''}
              register={register}
            />
          </>
        ) : (
          <></>
        )}

        <h6 className="text-sm pt-2 pb-3">
          {t('youAgreeProcessingPersonalData')}
        </h6>

        <Button type={ButtonTypes.SUBMIT} className="px-10 py-1">
          {t('send')}
        </Button>

        {!detailedView ? (
          <>
            <div className="separator my-4"></div>

            <span>{t('youCanAlsoContactUsByPhoneAndEmail')}</span>

            <div className="flex gap-x-2 mt-1">
              <ContactLink
                valueVisible={false}
                type={ContactLinkType.TELEGRAM}
                value={config.telegramLink}
              />
              |
              <ContactLink
                className="ml-2"
                type={ContactLinkType.MAIL}
                value={config.email}
                iconVisible={true}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
