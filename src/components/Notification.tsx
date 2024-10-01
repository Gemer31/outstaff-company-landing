'use client'

import { DomIds } from "@/models/enums"
import { convertToClass } from "@/utils/convert-to-class.util"

const hostClass = convertToClass([
    'notification',
    'bg-custom-black-1',
    'shadow-custom-red',
    'z-40',
    'px-4 py-2',
    'rounded-lg',
    'border-red',
    'max-w-80',
])
export function Notification() {
    return <div id={DomIds.NOTIFICATION} className={hostClass}></div>
}