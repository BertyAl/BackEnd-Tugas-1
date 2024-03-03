import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../anime.service'; // Update the path

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {
  animeId: string;
  anime: any;

  constructor(private route: ActivatedRoute, private animeService: AnimeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.animeId = params['id'];
      this.loadAnimeDetails();
    });
  }

  loadAnimeDetails() {
    this.animeService.getAnimeDetails(this.animeId).subscribe(
      (data: any) => {
        this.anime = data;
      },
      error => {
        console.error('Error fetching anime details:', error);
      }
    );
  }
}