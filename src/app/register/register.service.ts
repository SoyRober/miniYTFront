import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/public/register';

  constructor(private http: HttpClient) {}

  register(data: RegisterData) {
    return this.http.post<any>(this.apiUrl, data);
  }
}
