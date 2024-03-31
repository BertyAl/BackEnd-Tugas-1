// GAK DI PAKE

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private animeData = [
    {
      id: 1,
      title: 'Sousou no Frieren',
      description: "The mage Frieren defeated the Demon King alongside the hero Himmel's party after a 10-year quest. Peace was restored to the kingdom. Because she is an elf, she is able to live over a thousand years. She promises Himmel and the others that she will be back to see them and then sets out on a journey by herself. Fifty years later, Frieren goes to visit Himmel and the others. She remained unchanged, but Himmel and the others have aged and only a little of their lives remain. Later, she witnesses Himmel's death. Frieren is pained by her desire to have spent more time getting to know people. With that regret in her heart, she then goes on a journey to do just that. On her journey, she meets many people and many events await her.",
      image: 'https://u.livechart.me/anime/11376/poster_image/c7df8b9d73b2b0884572cb3ae2059def.webp/small.jpg',
      genre: 'Adventure,Drama,Fantasy,Magic',
      releaseDate: 'Fall 2023',
      rating: 9.15
    },
    {
      id: 2,
      title: 'Ore dake Level Up na Ken',
      description: `It's been over a decade since the sudden appearance of the "gates"—the paths that connect our world with a different dimension. Since then, certain humans have awakened to supernatural powers. We call these individuals "hunters." Hunters make their living by using their powers to conquer dungeons inside the gates. In this world of tough customers, the low-ranked hunter Jinwoo Sung is known as "the weakest hunter of all mankind." One day, Jinwoo gets fatally injured when he runs into high-rank double dungeons hidden within a low-rank dungeon. Just then, a mysterious quest window appears in front of him.`,
      image: 'https://u.livechart.me/anime/11320/poster_image/1e99278a4c92ede67b24cf550f8d511b.webp/small.jpg',
      genre: 'Action,Adventure,Fantasy',
      releaseDate: 'Jan 6, 2024',
      rating: 8.44
    },
  ];

  constructor() { }

  // Method to get details of a specific anime by ID
  getAnimeDetails(id: string): Observable<any> {
    const anime = this.animeData.find(a => a.id.toString() === id);
    return of(anime);
  }

  // Method to get a list of all anime
  getAnimeList(): Observable<any[]> {
    return of(this.animeData);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Anime } from '../models/anime';; // Import the Anime interface if you have defined one

// @Injectable({
//   providedIn: 'root'
// })
// export class AnimeService {
//   private apiUrl = 'http://localhost:3000/api/anime';

//   constructor(private http: HttpClient) {}

//   getAnimeList(): Observable<Anime[]> {
//     return this.http.get<Anime[]>(this.apiUrl);
//   }
// }
