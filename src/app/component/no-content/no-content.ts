import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-no-content',
  imports: [
    MatIcon
  ],
  templateUrl: './no-content.html',
  styleUrl: './no-content.css'
})
export class NoContent {
  @Input() message: string = 'No content available';
  @Input() icon: string = 'info';
}
