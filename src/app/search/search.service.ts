import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/public/search';

  constructor(private http: HttpClient) { }

  searchVideos(searchParam: string, page: number) {

    const url = searchParam
      ? `${this.apiUrl}?search=${encodeURIComponent(searchParam)}&page=${page}`
      : `${this.apiUrl}?page=${page}`;
    console.log(url);
    return this.http.get<any>(url);
  }
}
