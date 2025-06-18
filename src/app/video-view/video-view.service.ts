import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoViewService {
  private apiUrl = 'http://localhost:8080/public/video';

  constructor(private http: HttpClient) { }

  getVideo(uuid: string | null | undefined) {
    return this.http.get<any>(`${this.apiUrl}/${uuid}`);
  }
}
