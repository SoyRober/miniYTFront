import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/public/search';

  constructor(private http: HttpClient) { }

  searchVideos() {
    return this.http.get<any>(this.apiUrl);
  }
}
