// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  bookmarks: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.loadBookmarks();
  }
  
  logout(): void {
    this.storageService.clearUser();
    this.router.navigateByUrl('/login');
  }

  loadBookmarks(): void {
    // Load bookmarks from storage or API
    // For demonstration purposes, initialize with dummy data
    this.bookmarks = ['Bookmark 1', 'Bookmark 2', 'Bookmark 3'];
  }
}
