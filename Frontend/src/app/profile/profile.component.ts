// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  bookmarks: string[] = [];
  friends: any[] = [];
  favorites: any[] = [];
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.loadBookmarks();
    this.fetchFriends();
    this.fetchFavorite();
  }
  
  logout(): void {
    this.storageService.clearUser();
    this.router.navigateByUrl('/login');
  }

  loadBookmarks(): void {

    this.bookmarks = ['Bookmark 1', 'Bookmark 2', 'Bookmark 3'];
  }
  fetchFriends(): void {
    
    this.friends = ['friends 1', 'friends 2', 'friends 3'];
  }
  fetchFavorite(): void {
    
    this.favorites = ['fav 1', 'fav 2', 'fav 3','fav 4','fav 5','fav 6'];
  }
}
