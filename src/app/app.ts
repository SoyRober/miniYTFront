import {Component} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {VideoUpload} from './modal/video-upload/video-upload';
import {Router} from '@angular/router';
import {Toast} from './toast/toast';
import {ToastService} from './toast/toast.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
    Toast,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'MiniYT';

  constructor(private dialog: MatDialog, private router: Router, private toastService: ToastService) {
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
      this.router.navigate(['/search'], {queryParams: {title: searchTerm}});
    }
  }

  protected readonly String = String;

  showToast() {
    this.toastService.show(`This is toast info`, 'info', 3000);
    this.toastService.show(`This is toast success`, 'success', 2000);
    this.toastService.show(`This is toast error`, 'error', 1000);
  }
}
