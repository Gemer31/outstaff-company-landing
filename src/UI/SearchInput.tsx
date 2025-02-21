'use client';

import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { convertToClass } from '@/utils/convert-to-class.util';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export interface ISearchInputProps {
  searchButtonVisible?: boolean;
  pattern?: string;
  required?: boolean;
  placeholder?: string;
  delay?: number;
  onChange: (searchValue: string) => void;
  onValueChange?: (searchValue: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmit?: (searchValue: string) => void;
}

export function SearchInput({
  onChange,
  onValueChange,
  onSubmit,
  onBlur,
  onFocus,
  delay,
  placeholder,
  pattern,
  searchButtonVisible,
}: ISearchInputProps) {
  const t = useTranslations();
  const hostClass: string = useMemo(
    () =>
      convertToClass([
        searchButtonVisible
          ? 'border-l-2 border border-t-2 border-b-2'
          : 'border-2',
        searchButtonVisible ? 'rounded-l-md' : 'rounded-md',
        'w-full',
        'px-2.5',
        'py-1',
        'text-black',
      ]),
    []
  );
  const clearButtonClass: string = useMemo(
    () =>
      convertToClass([
        searchButtonVisible ? 'right-12' : 'right-4',
        'absolute',
        'top-1.5',
        'hover:scale-105',
        'duration-200',
      ]),
    []
  );

  const [value, setValue] = useState('');
  const timer = useRef(null);

  const valueChanged = (
    e: ChangeEvent<HTMLInputElement>,
    forced?: boolean,
    close?: boolean
  ): void => {
    const newValue = close
      ? ''
      : e?.target?.value !== undefined
        ? e?.target?.value
        : value;

    setValue(newValue);
    onValueChange?.(newValue);
    clearTimeout(timer.current);

    if (forced) {
      onChange(newValue);
    } else {
      timer.current = setTimeout(() => {
        onChange(newValue);
      }, delay ?? 1000);
    }
  };
  const onSubmitClick = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    clearTimeout(timer.current);
    if (onSubmit) {
      onSubmit(value);
    } else {
      onChange(value);
    }
  };

  return (
    <form
      className="relative flex duration-200"
      onSubmit={onSubmitClick}
      onBlur={() => onBlur?.()}
      onFocus={() => onFocus?.()}
    >
      {value?.length ? (
        <button
          type="button"
          className={clearButtonClass}
          onClick={() => valueChanged(null, true, true)}
        >
          ✖
        </button>
      ) : (
        <></>
      )}
      <input
        required
        placeholder={placeholder || t('search')}
        value={value}
        pattern={pattern}
        className={hostClass}
        onChange={valueChanged}
      />
      {searchButtonVisible ? (
        <button
          type="submit"
          className="bg-custom-red-3 rounded-r-md p-2"
          onClick={() => valueChanged(null, true)}
        >
          <Image
            className="hover:scale-105 duration-200"
            width={25}
            height={25}
            src="/icons/magnifer.svg"
            alt="Search"
          />
        </button>
      ) : (
        <></>
      )}
    </form>
  );
}
