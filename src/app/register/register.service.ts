import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/public/register`;

  constructor(private http: HttpClient) {}

  register(data: RegisterData) {
    return this.http.post<any>(this.apiUrl, data);
  }
}
