import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';

import { AnimeService } from '../_services/anime.service';



@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})

export class CommunityComponent implements OnInit {
  currentUser: any;
  threadList: any[] = [];
  constructor(
     private http: HttpClient,
     private router: Router,
     private storageService: StorageService,
     private animeService: AnimeService,
     private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadThreadList('');
    this.currentUser = this.storageService.getUser();
  }
  routeToNews() {
    this.router.navigate(['/news']);
}
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";

    this.dialog.open(DialogComponent,dialogConfig);
  }

  loadThreadList(title: string): void {

    this.animeService.getThreadList(title).subscribe(
      results => {
        this.threadList = results;
      },
      error => {
        console.error('Error fetching thread list:', error);
      }
    );
  }

}
