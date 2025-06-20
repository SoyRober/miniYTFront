import { Component, Input } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class Toast {
  @Input() message: string = "";
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 3000;
  @Input() visible: boolean = false;
}
