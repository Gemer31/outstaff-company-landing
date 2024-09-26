import { createRoot, Root } from 'react-dom/client';
import { PopupIds } from '@/UI/Popup';

export class PopupController {
  public contentRoot: Root;

  public static NAME = 'popupController';

  openPopup = (title: string, contentReactNode: React.ReactNode) => {
    const popup: HTMLElement = document.getElementById(PopupIds.POPUP);
    this.contentRoot = createRoot(document.getElementById(PopupIds.CONTENT));
    document.getElementById(PopupIds.TITLE).innerHTML = title;
    this.contentRoot.render(contentReactNode);
    popup.classList.remove('invisible');
    document.body.classList.add('overflow-hidden');
  };

  closePopup = () => {
    const popup: HTMLElement = document.getElementById(PopupIds.POPUP);
    this.contentRoot.unmount();
    popup.classList.add('invisible');
    document.body.classList.remove('overflow-hidden');
  };
}
