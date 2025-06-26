import {Component, inject} from '@angular/core';
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

  constructor(private dialog: MatDialog, private router: Router) {
  }

  noToken() {
    return !localStorage.getItem('token');
  }

  openUploadDialog() {
    this.dialog.open(VideoUpload, {
      width: '500px',
    });
  }

  searchVideos(searchTerm: string) {
    if (searchTerm.length === 0) {
      this.router.navigate(['/search']);
      return;
    } else {
      this.router.navigate(['/search'], {queryParams: {search: searchTerm}});
    }
  }
}
