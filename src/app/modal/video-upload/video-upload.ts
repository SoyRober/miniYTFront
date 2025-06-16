import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {VideoUploadService} from './video-upload.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-video-upload',
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatInput, MatLabel, ReactiveFormsModule, MatFormField],
  templateUrl: './video-upload.html',
  styleUrl: './video-upload.css'
})
export class VideoUpload {
  videoForm: FormGroup;
  selectedFile: File | null = null;
  selectedThumbnail: File | null = null;

  constructor(private videoService: VideoUploadService, private fb: FormBuilder) {
    this.videoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(0)]],
      file: [null, Validators.required],
      thumbnail: [null, Validators.required]
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }


  onUpload() {
    if (this.videoForm.invalid || !this.selectedFile) {
      console.log("Form is invalid or no file selected");
      return;
    }

    this.videoForm.value.file = this.selectedFile;
    this.videoForm.value.thumbnail = this.selectedThumbnail;

    const formData = this.videoForm.value;

    this.videoService.uploadVideo(formData).subscribe({
      next: () => {
        console.log(this.selectedFile);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 1280;
          canvas.height = 720;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, 1280, 720);
            canvas.toBlob(blob => {
              if (blob) {
                this.selectedThumbnail =
                  new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), { type: 'image/webp' });
              }
            }, 'image/webp', 0.8);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
