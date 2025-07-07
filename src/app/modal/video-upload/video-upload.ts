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
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(1000)]],
      thumbnail: [null],
      file: [null, Validators.required]
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.videoForm.patchValue({ file: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"),
                  { type: 'image/webp' });
                this.selectedThumbnail = webpFile;
              }
            }, 'image/webp', 0.8);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpload() {
    if (this.videoForm.invalid || !this.selectedFile) {
      console.log("Form is invalid or no file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const data = {
      title: this.videoForm.value.title,
      description: this.videoForm.value.description
    };
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (this.selectedThumbnail) {
      formData.append('thumbnail', this.selectedThumbnail);
    }

    this.videoService.uploadVideo(formData).subscribe({
      next: () => {
        console.log(this.selectedFile);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
