import { DomIds } from '@/models/enums';
import { createRoot, Root } from 'react-dom/client';

export class PopupController {
  public contentRoot: Root;

  public static NAME = 'popupController';

  openPopup = ({ popupId, title, contentReactNode }: {
    popupId?: string;
    title?: string,
    contentReactNode?: React.ReactNode
  }) => {
    let popup: HTMLElement;

    if (popupId) {
      popup = document.getElementById(popupId);
    } else {
      popup = document.getElementById(DomIds.POPUP_ID);
      this.contentRoot = createRoot(document.getElementById(DomIds.POPUP_CONTENT));
      document.getElementById(DomIds.POPUP_TITLE).innerHTML = title;
      this.contentRoot.render(contentReactNode);
    }
    popup.classList.remove('invisible');
    popup.classList.remove('opacity-0');
    document.body.classList.add('overflow-hidden');
  };

  closePopup = ({ popupId }: { popupId: string }) => {
    const popup: HTMLElement = document.getElementById(popupId || DomIds.POPUP_ID);
    popup.classList.add('invisible');
    popup.classList.add('opacity-0');
    if (!popupId) {
      setTimeout(() => {
        this.contentRoot.unmount();
      }, 500);
    }
    document.body.classList.remove('overflow-hidden');
  };
}

export function closePopup(payload: { popupId: string }): void {
  (document[PopupController.NAME] as PopupController).closePopup(payload);
}

export function openPopup(payload: {
  popupId?: string;
  title?: string,
  contentReactNode?: React.ReactNode
}): void {
  (document[PopupController.NAME] as PopupController).openPopup(payload);
}
