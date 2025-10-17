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

import { TopNav } from '../top-nav/top-nav'

import { TranslatePipe } from '../../pipes/translate-pipe';


@Component({
  selector: 'app-signin',
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
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  selectedLanguage = 'en'; // Default selection

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  ngOnInit(): void {
    console.log("we are in signin page");
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);

      // Simulate login process (replace with actual authentication logic)
      this.performLogin();
    } else {
      // Mark all as touched so label turns red immediately
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  get passwordControl() { return this.loginForm.get('password'); }

  private performLogin() {
    // Simulate API call delay
    setTimeout(() => {
      // Show success message
      this.snackBar.open('Login Successful! Welcome back!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      // Navigate to home page after a short delay
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }, 500);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}

