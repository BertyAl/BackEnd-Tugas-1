import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './News/news.component';
import { LoginComponent } from './login/login.component';
import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
//service
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { GenreComponent } from './genre/genre.component';
import { CommunityComponent } from './community/community.component';
import { DialogComponent } from './community/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
const routes: Routes = [
  // Define your routes here
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AnimeListComponent,
    AnimeDetailsComponent,
    FooterComponent,
    NewsComponent,
    LoginComponent,
    ForgotpwComponent,
    RegisterComponent,
    ProfileComponent,
    GenreComponent,
    CommunityComponent,
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()), 

  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
