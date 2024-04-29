import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { AnimeService } from '../_services/anime.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})


export class CommunityComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

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
  // onCreate(){
  //   this.dialog.open(DialogComponent,{
  //     width:'350px',
  //   })
  // }
}
