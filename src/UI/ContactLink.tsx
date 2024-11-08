import React from 'react';
import { ContactLinkType } from '@/models/enums';
import { transformPhoneUtil } from '@/utils/transform-phone.util';
import Image from 'next/image';
import Link from 'next/link';
import { LINK_CLASS } from '@/constants/common.constant';

interface IContactLinkProps {
  type: ContactLinkType,
  value: string,
  iconVisible?: boolean;
  valueVisible?: boolean;
  iconSize?: number;
  className?: string;
}

export function ContactLink({type, value, className, iconVisible, valueVisible, iconSize}: IContactLinkProps) {
  const getHref = (originValue: string) => {
    switch (type) {
      case ContactLinkType.MAIL: {
        return `mailto:${originValue}`;
      }
      case ContactLinkType.PHONE: {
        const phoneValue: string = transformPhoneUtil(value);
        return `tel:${phoneValue}`;
      }
      default: {
        return value || '';
      }
    }
  };

  return <div className="">
    <Link
      className={`${LINK_CLASS} flex items-center justify-center ${className || ''}`}
      href={getHref(value)}
    >
      {
        iconVisible !== false ? <Image
          className={valueVisible !== false ? 'mr-2' : ''}
          src={`/icons/${type}.svg`}
          width={iconSize || 25}
          height={iconSize || 25}
          alt={`Contact: ${value}`}
        /> : <></>
      }
      {valueVisible === false ? <></> : value}
    </Link>
  </div>;
}
