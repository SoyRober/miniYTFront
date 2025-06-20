import {ApplicationRef, Injectable, ComponentRef, createComponent} from '@angular/core';
import {ToastContainer} from './toast-container';

@Injectable({providedIn: 'root'})
export class ToastService {
    private toastId = 0
    private toasts: any[] = [];
    private containerRef: ComponentRef<ToastContainer> | null = null;

    constructor(private appRef: ApplicationRef) {
    }

    private ensureContainer() {
        if (!this.containerRef) {
            this.containerRef = createComponent(ToastContainer, {environmentInjector: this.appRef.injector});
            this.containerRef.instance.toasts = this.toasts;
            this.appRef.attachView(this.containerRef.hostView);
            document.body.appendChild((this.containerRef.hostView as any).rootNodes[0]);
        }
    }

    show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
        this.ensureContainer();

        if (this.toasts.length >= 3) {
            this.toasts.shift();
        }

        const toast = {id: ++this.toastId, message, type, duration, visible: true};
        this.toasts.push(toast);

        setTimeout(() => {
            toast.visible = false;
            setTimeout(() => {
                const idx = this.toasts.indexOf(toast);
                if (idx > -1) this.toasts.splice(idx, 1);
                if (this.toasts.length === 0 && this.containerRef) {
                    this.appRef.detachView(this.containerRef.hostView);
                    this.containerRef.destroy();
                    this.containerRef = null;
                }
            }, 500);
        }, duration);
    }
}
