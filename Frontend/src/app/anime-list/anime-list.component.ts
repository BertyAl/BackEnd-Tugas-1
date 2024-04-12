// anime-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Anime {
  _id: string;
  title: string;
  genres: string[];
  season: string;
  studios: string;
  main_pic: string;
}

interface AnimeListResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  animeList: Anime[];
}

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent implements OnInit {
  animeList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 52;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadAnimeList();
  }

  loadAnimeList() {
    const url = `http://localhost:4000/api/anime?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    // this.http.get<any[]>('http://localhost:4000/api/anime').subscribe(
    this.http.get<AnimeListResponse>(url).subscribe(

      (data: AnimeListResponse) => {
        this.animeList = data.animeList;
      },
      error => {
        console.error('Error fetching anime list:', error);
      }
    );
  }
  nextPage() {
    window.scrollTo(0, 0);
    this.currentPage++;
    this.loadAnimeList();
    this.router.navigate(['/anime-list'], { queryParams: { page: this.currentPage } });

  }

  previousPage() {
    if (this.currentPage > 1) {
      window.scrollTo(0, 0);  
      this.currentPage--;
      this.loadAnimeList();
      this.router.navigate(['/anime-list'], { queryParams: { page: this.currentPage } });

    }
  }
}

