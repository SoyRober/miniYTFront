import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoUploadService {
  private apiUrl = `${environment.apiUrl}/user/video/upload`;

  constructor(private http: HttpClient) {}

  uploadVideo(data: FormData) {
    return this.http.post<any>(this.apiUrl, data);
  }

}
