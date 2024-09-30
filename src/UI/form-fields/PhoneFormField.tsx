'use client';

import { convertToClass } from '@/utils/convert-to-class.util';
import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { InputMask } from '@react-input/mask';
import { FormFieldWrapper } from './FormFieldWrapper';

interface IFormField {
  required?: boolean;
  label: string;
  type: string;
  name: string;
  error: string;
  register: unknown;
}

export function PhoneFormField({
  label,
  name,
  register,
  type,
  error,
  required,
}: IFormField) {
  const inputClass: string = useMemo(
    () =>
      convertToClass([
        'bg-custom-black-2',
        'border-custom-black-2',
        'border-2',
        'rounded-md',
        'mt-1',
        'w-full',
        'px-2.5',
        'py-1',
      ]),
    []
  );

  return (
    <FormFieldWrapper label={label} error={error} required={required}>
      <InputMask
        // @ts-ignore
        placeholder="+375 (XX) XXX-XX-XX"
        mask="+375 (__) ___-__-__"
        replacement={{ _: /\d/ }}
        className={inputClass}
        type={type}
        {...(register as UseFormRegister<Record<string, unknown>>)(name)}
      />
    </FormFieldWrapper>
  );
}