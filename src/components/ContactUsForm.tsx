'use client';

import { showNotification } from '@/UI/notification/notification.controller';
import { closePopup } from '@/UI/popup/popup.controller';
import { IConfig } from '@/models/common.model';
import { ButtonTypes, ContactLinkType, DomIds } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { ContactLink } from '@/UI/ContactLink';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { PhoneFormField } from '@/UI/form-fields/PhoneFormField';
import { Popup } from '@/UI/popup/Popup';
import { YupUtil } from '@/utils/yup.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

interface IContactUsFormProps {
  config: IConfig;
}

export function ContactUsForm({config}: IContactUsFormProps) {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.ContactUsFormSchema),
  });

  const submitForm = () => {
    closePopup({popupId: DomIds.REQUEST_CALL_POPUP_ID});
    showNotification(t('ourManagersCallYou'));
  };

  return <Popup id={DomIds.REQUEST_CALL_POPUP_ID} title={t('requestCall')}>
    <form onSubmit={handleSubmit(submitForm)}>
      <InputFormField
        required={true}
        placeholder={t('yourOrCompanyName')}
        label={t('yourOrCompanyName')}
        name="name"
        type="text"
        error={t(errors?.yourOrCompanyName?.message)}
        register={register}
      />
      <PhoneFormField
        required={true}
        label={t('phone')}
        type="text"
        name="phone"
        error={t(errors?.phone?.message)}
        register={register}
      />

      <h6 className="text-sm pt-2 pb-3">{t('youAgreeProcessingPersonalData')}</h6>

      <Button type={ButtonTypes.SUBMIT} className="px-10 py-1">{t('send')}</Button>

      <div className="separator my-4"></div>

      <span>{t('youCanAlsoContactUsByPhoneAndEmail')}</span>

      <div className="flex gap-x-6">
        <ContactLink className="ml-2" type={ContactLinkType.MAIL} value={config.email} icon={true}/>
        <ContactLink className="ml-2" type={ContactLinkType.PHONE} value={config.phone} icon={true}/>
      </div>
    </form>
  </Popup>;
}
