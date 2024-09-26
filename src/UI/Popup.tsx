'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { PopupContext } from '@/utils/popup.util';

export enum PopupIds {
  POPUP = 'popup',
  TITLE = "popupTitle",
  CONTENT = "popupContent",
}

export interface IPopupProps {
  title: string;
  closeCallback: () => void;
}

export function Popup({}: IPopupProps) {
  useEffect(() => {
    if (!document?.['popupContext']) {
      document['popupContext'] = new PopupContext();
    }
  }, []);

  const closeClick = () => {
    (document['popupContext'] as PopupContext).closePopup();
  }

  return (
    <div
      id={PopupIds.POPUP}
      className="flex justify-center items-center fixed w-full h-full bg-black-1/2 invisible"
    >
      <div
        className="flex flex-col justify-center bg-gray-200 rounded-2xl"
      >
        <div className="flex justify-between items-center p-4">
          <span
            id={PopupIds.TITLE}
            className="text-xl"
          >Title</span>
          <div className="cursor-pointer" onClick={closeClick}>
            <Image width={40} height={40} src="/icons/close.svg" alt="Close" />
          </div>
        </div>
        <div
          id={PopupIds.CONTENT}
          className="px-4 pb-4"
        ></div>
      </div>
    </div>
  );
}
