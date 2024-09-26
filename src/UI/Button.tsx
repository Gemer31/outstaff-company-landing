'use client';

import { convertToClass } from '@/utils/convert-to-class.util';
import { MouseEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@/UI/Loader';

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
}
export enum ColorOptions {
  PINK = 'pink',
  GRAY = 'gray',
}

export const COLOR_OPTION_VALUES = new Map<ColorOptions, string>([
  [
    ColorOptions.PINK,
    'bg-custom-red-1 hover:bg-custom-red-2 active:bg-pink-600 text-white',
  ],
  [
    ColorOptions.GRAY,
    'bg-slate-100 hover:bg-slate-400 active:bg-slate-600 text-black',
  ],
]);

export interface IButtonProps {
  children: React.ReactNode;
  color?: ColorOptions;
  type?: ButtonTypes;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  setLoadingOnClick?: boolean;
  className?: string;
  callback?: (event: MouseEvent) => void;
}

export function Button({
  children,
  href,
  callback,
  type,
  disabled,
  loading,
  setLoadingOnClick,
  color,
                         className,
}: IButtonProps) {
  const [innerLoading, setInnerLoading] = useState(false);

  const buttonClass: string = useMemo(
    () =>
      convertToClass([
        'flex',
        'relative',
        'justify-center',
        'items-center',
        'rounded-md',
        'h-fit',
        'duration-200',
        'active:scale-100',
        'hover:scale-105',
        disabled || innerLoading ? 'pointer-events-none opacity-75' : '',
      ]),
    [disabled, innerLoading]
  );

  const clicked = (event: MouseEvent) => {
    if (setLoadingOnClick) {
      setInnerLoading(true);
    }
    callback?.(event);
  };

  return href ? (
    <Link
      className={
        buttonClass +
        ' ' +
        COLOR_OPTION_VALUES.get(color || ColorOptions.PINK) +
        ' ' +
        className
      }
      onClick={clicked}
      href={href}
    >
      <div className={loading || innerLoading ? 'invisible' : ''}>
        {children}
      </div>
      <div
        className={`${loading || innerLoading ? 'w-full h-full flex justify-center text-center absolute top-0' : 'important-hidden'} ${className}`}
      >
        <Loader
          className={
            'h-full ' + (color === ColorOptions.GRAY ? 'border-pink-500' : '')
          }
        />
      </div>
    </Link>
  ) : (
    <button
      type={type || ButtonTypes.BUTTON}
      className={
        buttonClass +
        ' ' +
        COLOR_OPTION_VALUES.get(color || ColorOptions.PINK) +
        ' ' +
        className
      }
      onClick={clicked}
    >
      <div className={loading || innerLoading ? 'invisible' : ''}>
        {children}
      </div>
      <div
        className={`${loading || innerLoading ? 'w-full h-full absolute top-0' : 'important-hidden'} ${className}`}
      >
        <Loader
          className={
            'h-full ' + (color === ColorOptions.GRAY ? 'border-pink-500' : '')
          }
        />
      </div>
    </button>
  );
}
