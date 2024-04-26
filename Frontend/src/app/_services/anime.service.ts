import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = 'http://localhost:4000/api/anime/search/';
  constructor(private http: HttpClient) { }
  searchAnime(query: string): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl}/search?q=${query}`).pipe(
    //   map(response => response)
    // );
    const url = `${this.baseUrl}?q=${query}`; // Construct the URL correctly
    return this.http.get<any[]>(url);
  }
}
