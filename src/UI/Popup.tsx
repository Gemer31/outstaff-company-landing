'use client';

import { PopupController } from '@/utils/popup.util';
import Image from 'next/image';
import { useEffect } from 'react';

export enum PopupIds {
  POPUP = 'popup',
  TITLE = "popupTitle",
  CONTENT = "popupContent",
}

export function Popup() {
  useEffect(() => {
    if (!document?.[PopupController.NAME]) {
      document[PopupController.NAME] = new PopupController();
    }
  }, []);

  const closeClick = () => {
    (document[PopupController.NAME] as PopupController).closePopup();
  }

  return (
    <div
      id={PopupIds.POPUP}
      className="flex top-0 z-50 justify-center items-center fixed w-full h-full bg-black-1/2 invisible"
    >
      <div
        className="popup flex flex-col justify-center bg-custom-black-1 rounded-md"
      >
        <div className="flex justify-between items-center p-4">
          <span
            id={PopupIds.TITLE}
            className="text-2xl"
          >Title</span>
          <div className="cursor-pointer" onClick={closeClick}>
            <Image width={60} height={60} src="/icons/close.svg" alt="Close" />
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
