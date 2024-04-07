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
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private AuthService: AuthService) { }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.AuthService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
