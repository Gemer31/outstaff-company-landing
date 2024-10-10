import React from 'react';
import { ContactLinkType } from "@/models/enums"
import { transformPhoneUtil } from "@/utils/transform-phone.util"
import Image from "next/image"
import Link from "next/link"
import { LINK_CLASS } from '@/constants/common.constant';

interface IContactLinkProps {
    type: ContactLinkType,
    value: string,
    icon?: boolean
    className?: string
}

export function ContactLink({ type, value, className, icon }: IContactLinkProps) {
    return <div className='flex items-center'>
        {
            icon ? <Image
                className="mr-2"
                src={`/icons/${type === ContactLinkType.PHONE ? 'phone' : 'mail'}.svg`}
                width={20}
                height={20}
                alt={`Contact: ${value}`}
            /> : <></>
        }
        <Link
            className={LINK_CLASS + ' ' + (className || '')}
            href={type + (type === ContactLinkType.PHONE ? transformPhoneUtil(value) : value)}
        >{value}</Link>
    </div>;
}