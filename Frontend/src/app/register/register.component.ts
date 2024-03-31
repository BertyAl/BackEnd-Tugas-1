// import { Component } from '@angular/core';
// import { AuthenticationService } from '../authentication.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent {
//   name: string;
//   email: string;
//   password: string;

//   constructor(private authService: AuthenticationService, private router: Router) {}

//   register() {
//     // Call authentication service to register user
//     this.authService.register(this.name, this.email, this.password)
//       .subscribe(
//         response => {
//           // Handle successful registration response (e.g., redirect to login page)
//           console.log('Registration successful:', response);
//           this.router.navigate(['/login']);
//         },
//         error => {
//           // Handle registration error (e.g., display error message)
//           console.error('Registration failed:', error);
//         }
//       );
//   }

//   cancel() {
//     // Implement cancel action (e.g., navigate to login page)
//     this.router.navigate(['/login']);
//   }
// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post<any>('http://localhost:4000/api/register', { username: this.username, password: this.password })
      .subscribe(
        response => {
          console.log(response);
          this.successMessage = 'Registration successful';
          // Optionally, you can clear the input fields here
        },
        error => {
          console.error(error);
          this.errorMessage = 'Registration failed';
        }
      );
  }
}