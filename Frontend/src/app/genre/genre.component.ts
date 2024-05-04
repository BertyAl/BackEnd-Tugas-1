import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
  
})
export class GenreComponent implements OnInit {
  genreList: string[] = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
    'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Kids', 'Super Power', 'Mecha',
    'Music', 'Cars', 'School', 'Shounen', 'Shoujo', 'Vampire', 'Psychological', 'Demons',
    'Seinen', 'Military', 'Police', 'Martial Arts', 'Historical'
  ];  

  constructor(

  ) { }

  ngOnInit(): void {
    
  }

}