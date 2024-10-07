import { DomIds } from '@/models/enums';

export class NotificationController {

  static NAME = 'notification';

  private showTimeout: number;
  private closeTimeout: number;
  private pauseTimeout: number;
  private resetTimeout: number;

  constructor(
    private animationDuration: number,
    private displayDuration: number,
  ) {
  }

  public showNotification(message: string) {
    const notificationEl: HTMLElement = document.getElementById(DomIds.NOTIFICATION) as HTMLElement;
    notificationEl.innerText = message;

    if (this.pauseTimeout) {
      this.close(notificationEl);
      clearTimeout(this.resetTimeout);
      this.resetTimeout = window.setTimeout(() => {
        this.show(notificationEl);
      }, this.animationDuration);
    } else {
      this.show(notificationEl);
    }
  }

  private close(el: HTMLElement) {
    el.classList.remove('pause');
    clearTimeout(this.closeTimeout);
    this.closeTimeout = window.setTimeout(() => {
      el.classList.add('hidden');
      el.classList.remove('pause');
      clearTimeout(this.pauseTimeout);
      clearTimeout(this.showTimeout);
    }, this.animationDuration);
  }

  private show(el: HTMLElement) {
    el.classList.remove('hidden');
    clearTimeout(this.showTimeout);
    this.showTimeout = window.setTimeout(() => {
      this.pause(el);
    }, this.animationDuration);
  }

  private pause(el: HTMLElement) {
    el.classList.add('pause');
    clearTimeout(this.pauseTimeout);
    this.pauseTimeout = window.setTimeout(() => {
      this.close(el);
    }, this.displayDuration);
  }
}

export function showNotification(msg: string): void {
  (document[NotificationController.NAME] as NotificationController).showNotification(msg);
}
