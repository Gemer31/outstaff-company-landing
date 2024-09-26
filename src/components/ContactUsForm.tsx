'use client';

import { Button } from '@/UI/Button';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { PhoneFormField } from '@/UI/form-fields/PhoneFormField';
import { YupUtil } from '@/utils/yup.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface IContactUsFormProps {
  translateContext: unknown
}

export function ContactUsForm({ translateContext }: IContactUsFormProps) {
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
        (document[PopupController.NAME] as PopupController).closePopup();
  };

  return <form onSubmit={handleSubmit(submitForm)}>
    <InputFormField
      required
      placeholder={translateContext('yourOrCompanyName')}
      label={translateContext('yourOrCompanyName')}
      name="name"
      type="text"
      error={errors.yourOrCompanyName?.message}
      register={register}
    />
    <PhoneFormField
      required
      placeholder={translateContext('phone')}
      label={translateContext('phone')}
      type="text"
      name="phone"
      error={errors.phone?.message}
      register={register}
    />

    <h6 className="text-sm py-2">{translateContext('youAgreeProcessingPersonalData')}</h6>

    <Button className="px-4 py-2">{translateContext('send')}</Button>
  </form>;
}
