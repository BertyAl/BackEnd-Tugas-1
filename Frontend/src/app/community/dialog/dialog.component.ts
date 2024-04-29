import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {

  fm1: FormGroup;
  
  errorMessage = '';
  isSuccessful = false;
  isThreadFailed = false;
  titleExistsWarning = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    private authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.fm1 = this.fb.group({
      title: ['', Validators.required],
      thread: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.fm1.valid) {
      const { title, thread } = this.fm1.value;
  
      this.authService.form(title,thread).subscribe({
          next: data => {
            console.log(data);
            console.log(title, thread);
            this.isSuccessful = true;
            this.isThreadFailed = false;
            this.dialogRef.close();
          },
          error: err => {
            if (err.status === 400) {
              this.titleExistsWarning = true;
            } else {
              
              this.errorMessage = err.error.message;
              this.isThreadFailed = true;
            }
          }
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
