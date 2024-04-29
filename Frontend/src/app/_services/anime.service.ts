import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = 'http://localhost:4000/api/anime/search/';
  constructor(private http: HttpClient) { }
  searchAnime(query: string): Observable<any[]> {
    const url = `${this.baseUrl}?q=${query}`; // Construct the URL correctly
    return this.http.get<any[]>(url);
  }
}
