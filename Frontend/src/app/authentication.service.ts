// ga di pake



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post('/api/register', { name, email, password });
  }

  logout(): Observable<any> {
    return this.http.delete('/api/logout');
  }
}
