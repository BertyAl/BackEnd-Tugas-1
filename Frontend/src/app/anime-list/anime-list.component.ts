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
  animeList: Anime[] = [];
  filteredAnimeList: Anime[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 52;
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadAnimeList();
  }

  loadAnimeList() {
    const url = `http://localhost:4000/api/anime?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    this.http.get<AnimeListResponse>(url).subscribe(
      (data: AnimeListResponse) => {
        this.animeList = data.animeList;
        this.filteredAnimeList = this.animeList; // Initialize filtered list with all anime
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

  // Filter anime list based on search query
  filterAnimeList() {
    this.filteredAnimeList = this.animeList.filter(anime =>
      anime.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
