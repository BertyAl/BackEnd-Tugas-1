import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Anime {
  _id: string;
  title: string;
  genres: string;
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
  selector: 'app-genredetail',
  templateUrl: './genredetail.component.html',
  styleUrl: './genredetail.component.scss'
})
export class GenredetailComponent implements OnInit {
  genres: string;
  animeList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 52;
  loading: boolean = false; // Define loading property
  error: boolean = false; // Define error property
  totalPages: number;

  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genres = params['genres'];
        this.getGenreDetails();
      
     });
  }
  getGenreDetails(): void {
    console.log('Current Genres:', this.genres); // Log the current genres

    this.loading = true;
    this.error = false;
    const url = `http://localhost:4000/api/genre/${this.genres}?page=${this.currentPage}&limit=${this.itemsPerPage}`;

    this.http.get<AnimeListResponse>(url) .subscribe(
      (data: any) => {
        this.animeList = data.animeList;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
      error => {
        this.error = true;
        this.loading = false;
        console.error('Error fetching anime details:', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      window.scrollTo(0, 0);  
      this.currentPage++;
      this.getGenreDetails();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      window.scrollTo(0, 0);  
      this.currentPage--;
      this.getGenreDetails();
    }
  }
}