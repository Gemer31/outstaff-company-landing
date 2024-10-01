import { DomIds } from '@/models/enums';

const TIMEOUT_VALUE = 5000;
const ANIMATION_DURATION = 300;
const SHOW_CLASS = 'show';

export class NotificationController {

    static NAME = 'notification';

    private timeout: number;
    private resetTimeout: number;

    public showNotification(message: string) {
        const notificationEl: HTMLElement = document.getElementById(DomIds.NOTIFICATION) as HTMLElement;
        notificationEl.innerText = message;

        if (this.timeout) {
            this.close(notificationEl);
            clearTimeout(this.timeout);
            clearTimeout(this.resetTimeout);
            this.resetTimeout = window.setTimeout(() => {
                this.show(notificationEl);
            }, ANIMATION_DURATION);
        } else {
            this.show(notificationEl);
        }
    }

    private close(el: HTMLElement) {
        el.classList.remove(SHOW_CLASS);
    }

    private show(el: HTMLElement) {
        el.classList.add(SHOW_CLASS);
        this.timeout = window.setTimeout(() => {
            this.close(el);
        }, TIMEOUT_VALUE);
    }
}