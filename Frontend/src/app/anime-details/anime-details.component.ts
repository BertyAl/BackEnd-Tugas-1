
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {
  anime_id: string;
  anime: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.anime_id = params['id'];
      this.getAnimeDetails();
    });
  }

  getAnimeDetails() {
    const url = `http://localhost:4000/api/anime/${this.anime_id}`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.anime = data;
      },
      error => {
        console.error('Error fetching anime details:', error);
      }
    );
  }
}
