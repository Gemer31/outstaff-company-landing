'use client';

import { IConfig } from '@/models/common.model';
import { ContactLinkType, PopupIds } from '@/models/enums';
import { Button } from '@/UI/Button';
import { ContactLink } from '@/UI/ContactLink';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { PhoneFormField } from '@/UI/form-fields/PhoneFormField';
import { Popup } from '@/UI/Popup';
import { YupUtil } from '@/utils/yup.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

interface IContactUsFormProps {
  config: IConfig
}

export function ContactUsForm({ config }: IContactUsFormProps) {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.ContactUsFormSchema),
  });

  const submitForm = () => {
    // @ts-ignore
    (document[PopupController.NAME] as PopupController).closePopup(PopupIds.REQUEST_CALL_POPUP_ID);
  };

  return <Popup id={PopupIds.REQUEST_CALL_POPUP_ID} title={t('requestCall')}>
    <form onSubmit={handleSubmit(submitForm)}>
      <InputFormField
        required
        placeholder={t('yourOrCompanyName')}
        label={t('yourOrCompanyName')}
        name="name"
        type="text"
        error={errors.yourOrCompanyName?.message}
        register={register}
      />
      <PhoneFormField
        required
        placeholder={t('phone')}
        label={t('phone')}
        type="text"
        name="phone"
        error={errors.phone?.message}
        register={register}
      />

      <h6 className="text-sm py-2">{t('youAgreeProcessingPersonalData')}</h6>

      <Button className="px-10 py-1">{t('send')}</Button>

      <div className="separator my-4"></div>

      <span>{t('youCanAlsoContactUsByPhoneAndEmail')}</span>
      <div className="flex gap-x-6">
        <div className='flex items-center'>
          <Image src="/icons/mail.svg" width={20} height={20} alt={`Phone number: ${config.phone}`} />
          <ContactLink className="ml-2" type={ContactLinkType.MAIL} value={config.email} />
        </div>
        <div className='flex items-center'>
          <Image src="/icons/phone.svg" width={20} height={20} alt={`Phone number: ${config.phone}`} />
          <ContactLink className="ml-2" type={ContactLinkType.PHONE} value={config.phone} />
        </div>
      </div>
    </form>
  </Popup>
}
