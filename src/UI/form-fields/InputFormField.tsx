'use client';

import { convertToClass } from '@/utils/convert-to-class.util';
import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormFieldWrapper } from './FormFieldWrapper';

interface IInputFormFieldProps {
  className?: string;
  inLine?: boolean;
  hideValueAvailable?: boolean;
  required?: boolean;
  placeholder?: string;
  label: string;
  type: string;
  name: string;
  error: string;
  onBlur?: () => void;
  register: unknown;
}

const hostClass: string = convertToClass([
  'relative',
  'bg-custom-black-2',
  'border-custom-black-2',
  'border-2',
  'rounded-md',
  'mt-1',
  'w-full',
  'px-2.5',
  'py-1',
]);

export function InputFormField({
                                 className,
                                 label,
                                 name,
                                 register,
                                 type,
                                 error,
                                 required,
                                 placeholder,
                                 hideValueAvailable,
                                 onBlur,
                                 inLine,
                               }: IInputFormFieldProps) {
  const [hideValue, setHideValue] = useState(true);

  return (
    <FormFieldWrapper
      label={label}
      error={error}
      required={required}
      className={(className || '') + (inLine ? 'flex items-center' : '')}>
      <input
        className={hostClass + ' ' + (error ? 'border-custom-red-1' : '')}
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
