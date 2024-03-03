import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    outlet: 'header', // Define an outlet for the header
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'anime-list',
    component: AnimeListComponent,
  },
  {
    path: 'anime-details/:id',
    component: AnimeDetailsComponent,
  },
  {
    path: '',
    component: FooterComponent,
    outlet: 'footer', // Define an outlet for the footer
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
