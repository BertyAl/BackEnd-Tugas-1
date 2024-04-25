import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './News/news.component';
import { HomeComponent } from './home/home.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { GenreComponent } from './genre/genre.component';
import { CommunityComponent } from './community/community.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    outlet: 'header', 
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
    outlet: 'footer', 
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'genre',
    component: GenreComponent,
  },
  {
    path: 'community',
    component: CommunityComponent,
  },
  {
    path: 'forgotpw',
    component: ForgotpwComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
