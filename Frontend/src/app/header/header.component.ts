import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: any;
  constructor(
    private storageService: StorageService,
    private router: Router 
   ) { }
   ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
   }
  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn(); 
  }
  logout(): void {
    this.storageService.clearUser();
    this.router.navigateByUrl('/login');
  }
}
