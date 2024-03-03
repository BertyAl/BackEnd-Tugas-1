// anime-list.component.ts

import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent implements OnInit {
  animeList: any[] = []; // Ensure this line is present

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.loadAnimeList();
  }

  loadAnimeList() {
    this.animeService.getAnimeList().subscribe(
      (data: any[]) => {
        this.animeList = data;
      },
      error => {
        console.error('Error fetching anime list:', error);
      }
    );
  }
}

