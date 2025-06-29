import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/public/search';

  constructor(private http: HttpClient) { }

  searchVideos(searchParam: string, page: number) {
    console.log(searchParam);
    const url = searchParam
      ? `${this.apiUrl}?search=${encodeURIComponent(searchParam)}&page=${page}`
      : this.apiUrl;
    return this.http.get<any>(url);
  }
}
