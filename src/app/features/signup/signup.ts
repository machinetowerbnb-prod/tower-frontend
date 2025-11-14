import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopNav } from '../top-nav/top-nav'

import { TranslatePipe } from '../../pipes/translate-pipe';


@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    TopNav,
    TranslatePipe
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup implements OnInit {

  signupForm: FormGroup;
  hidePassword = true;

  selectedLanguage = 'en'; // Default selection

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      epin: ['', [Validators.required, Validators.minLength(4)]],
      confirmEpin: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      refferal: ['', Validators.required]
    });

  }


  ngOnInit(): void {
    console.log("we are in Signup page");
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

onSubmit() {
    if (this.signupForm.valid) {
      const payload = {
        userName: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        passcode: this.signupForm.value.epin,
        refferedCode: this.signupForm.value.refferal || ''
      };

      console.log('Signup payload:', payload);

      this.authService.signup(payload).subscribe({
        next: (res) => {
          if (res.statusCode === 201) {
            this.snackBar.open('Account created successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            setTimeout(() => this.router.navigate(['/signin']), 1000);
          }
        },
        error: (err) => {
          console.error('Signup error:', err);
          this.snackBar.open(
            err.error?.message || 'Something went wrong!',
            'Close',
            { duration: 3000, panelClass: ['error-snackbar'] }
          );
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.snackBar.open('Please fill in all fields correctly', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}

