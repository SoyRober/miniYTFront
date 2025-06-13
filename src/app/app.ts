import {Component} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {VideoUpload} from './modal/video-upload/video-upload';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'MiniYT';

  constructor(private dialog: MatDialog) {}

  noToken() {
    return !localStorage.getItem('token');
  }

  openUploadDialog() {
    this.dialog.open(VideoUpload, {
      width: '500px',
    });
  }
}
