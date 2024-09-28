import { PopupIds } from '@/models/enums';
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
      popup = document.getElementById(PopupIds.POPUP);
      this.contentRoot = createRoot(document.getElementById(PopupIds.CONTENT));
      document.getElementById(PopupIds.TITLE).innerHTML = title;
      this.contentRoot.render(contentReactNode);
    }
    popup.classList.remove('invisible');
    popup.classList.remove('opacity-0');
    document.body.classList.add('overflow-hidden');
  };

  closePopup = ({ popupId }: { popupId: string }) => {
    const popup: HTMLElement = document.getElementById(popupId || PopupIds.POPUP_ID);
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
