import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = 'http://localhost:4000/api/anime/search/';
  private apiUrl = 'http://localhost:4000/api/form/get';
  private genreUrl = 'http://localhost:4000/api/genres';

  constructor(private http: HttpClient) { }
  searchAnime(query: string): Observable<any[]> {
    const url = `${this.baseUrl}?q=${query}`; 
    return this.http.get<any[]>(url);
  }
  getThreadList(title: string): Observable<any[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
    }
    getThreadDetail(title: string, thread: string): Observable<any[]> {
      return this.http.get<any>(this.apiUrl)
        .pipe(
          catchError(this.handleError)
        );
      }
    private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
    
  }
  getThreadByTitle(title: string, thread: string): Observable<any> {
    const url = `${this.apiUrl}?title=${encodeURIComponent(title)}`;
    return this.http.get<any>(url);

  }
  getGenres(genres: string): Observable<any> {
    return this.http.get<any>(this.genreUrl)
    .pipe(
      catchError(this.handleError)
    );

  }


}
