'use client';

import { PopupIds } from '@/models/enums';
import { convertToClass } from '@/utils/convert-to-class.util';
import { PopupController } from '@/utils/popup.util';
import Image from 'next/image';
import { useEffect } from 'react';



export interface IPopupProps {
  id?: string;
  title?: string;
  children?: React.ReactNode;
}

const hostClass = convertToClass([
  'flex',
  'top-0',
  'z-50',
  'justify-center',
  'items-center',
  'fixed',
  'w-full',
  'h-full',
  'bg-black-4/5',
  'transition-all',
  'duration-500'
]);

export function Popup({ id, title, children }: IPopupProps) {
  const closeClick = () => {
    (document[PopupController.NAME] as PopupController).closePopup({ popupId: id });
  }

  return (
    <div
      id={id || PopupIds.POPUP_ID}
      className={hostClass + " invisible opacity-0"}
    >
      <div
        className="popup flex flex-col justify-center bg-custom-black-1 rounded-md"
      >
        <div className="flex justify-between items-center p-4">
          <span
            id={PopupIds.TITLE}
            className="text-2xl"
          >{title}</span>
          <div className="cursor-pointer" onClick={closeClick}>
            <Image width={60} height={60} src="/icons/close.svg" alt="Close" />
          </div>
        </div>
        <section id={PopupIds.CONTENT} className="px-4 pb-4">{children}</section>
      </div>
    </div>
  );
}
