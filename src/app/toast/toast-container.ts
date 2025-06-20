import { Component, Input } from '@angular/core';
import { Toast } from './toast';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
  standalone: true,
  imports: [Toast]
})
export class ToastContainer {
  @Input() toasts: any[] = [];
}
