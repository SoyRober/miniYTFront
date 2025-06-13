import {Component} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {VideoUploadService} from './video-upload.service';

@Component({
  selector: 'app-video-upload',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './video-upload.html',
  styleUrl: './video-upload.css'
})
export class VideoUpload {
  selectedFile: File | null = null;

  constructor(private videoService: VideoUploadService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }


  onUpload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('video', this.selectedFile);

    this.videoService.uploadVideo(formData).subscribe({
      next: () => {
        console.log(this.selectedFile);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
