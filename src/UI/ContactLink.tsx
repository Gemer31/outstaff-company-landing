import { ContactLinkType } from "@/models/enums"
import { transformPhoneUtil } from "@/utils/transform-phone.util"
import Link from "next/link"

interface IContactLinkProps {
    type: ContactLinkType,
    value: string,
    className?: string
}

export function ContactLink({ type, value, className }: IContactLinkProps) {
    return <>
        <Link
            className={'hover:text-custom-red-2 duration-200 transition-colors ' + (className || '')}
            href={type + (type === ContactLinkType.PHONE ? transformPhoneUtil(value) : value)}
        >{value}</Link>
    </>
}