'use client';

import React from 'react';
import { convertToClass } from '@/utils/convert-to-class.util';
import { useMemo, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import Image from 'next/image';
import { FormFieldWrapper } from './FormFieldWrapper';

interface IInputFormFieldProps {
  hideValueAvailable?: boolean;
  required?: boolean;
  placeholder: string;
  label: string;
  type: string;
  name: string;
  error: string;
  onBlur?: () => void;
  register: unknown;
}

export function InputFormField({
  label,
  name,
  register,
  type,
  error,
  required,
  placeholder,
  hideValueAvailable,
  onBlur,
}: IInputFormFieldProps) {
  const [hideValue, setHideValue] = useState(true);

  const hostClass: string = useMemo(
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
      <input
        className={hostClass}
        placeholder={placeholder}
        type={hideValueAvailable && hideValue ? 'password' : type}
        onBlur={onBlur}
        {...(register as UseFormRegister<Record<string, unknown>>)(name)}
      />

      {hideValueAvailable ? (
        <Image
          className="cursor-pointer p-1 absolute right-4 bottom-5"
          onClick={(e) => {
            e.stopPropagation();
            setHideValue((prevState) => !prevState);
          }}
          width={25}
          height={25}
          src={!hideValue ? '/icons/eye.svg' : '/icons/eye-closed.svg'}
          alt="Hide input value"
        />
      ) : (
        <></>
      )}
    </FormFieldWrapper>
  );
}
