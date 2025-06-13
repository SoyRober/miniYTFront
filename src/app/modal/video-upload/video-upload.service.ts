import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoUploadService {
  private apiUrl = 'http://localhost:8080/user/video/upload';

  constructor(private http: HttpClient) {}

  uploadVideo(data: FormData) {
    return this.http.post<any>(this.apiUrl, data);
  }

}
