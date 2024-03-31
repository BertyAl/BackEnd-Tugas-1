// import { Component } from '@angular/core';
// import { AuthenticationService } from '../authentication.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   email: string; // Declare the email property here
//   password: string;

//   constructor(private authService: AuthenticationService, private router: Router) {}

//   login() {
//     this.authService.login(this.email, this.password)
//       .subscribe(
//         response => {
//           console.log('Login successful:', response);
//           this.router.navigate(['/']);
//         },
//         error => {
//           console.error('Login failed:', error);
//         }
//       );
//   }

//   cancel() {
//     this.router.navigate(['/']);
//   }
// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  login() {
    this.errorMessage = '';

    this.http.post<any>('http://localhost:4000/api/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          console.log(response);
          // Handle successful login, e.g., store token in localStorage
        },
        error => {
          console.error(error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
}
