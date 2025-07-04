import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/public/login`;

  constructor(private http: HttpClient) {}

  login(data: LoginData) {
    return this.http.post<any>(this.apiUrl, data);
  }
}
