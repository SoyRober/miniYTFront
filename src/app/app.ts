import {Component} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {VideoUpload} from './modal/video-upload/video-upload';
import {Router} from '@angular/router';
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

  constructor(private dialog: MatDialog, private router: Router) {}

  noToken() {
    return !localStorage.getItem('token');
  }

  openUploadDialog() {
    this.dialog.open(VideoUpload, {
      width: '500px',
    });
  }

  searchVideos(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;
    this.router.navigate(['/search'], { queryParams: { search: value } });
  }

  protected readonly String = String;
}
