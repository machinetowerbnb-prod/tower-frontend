import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    TopNav],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword implements OnInit {
  passwordForm: FormGroup;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.passwordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    console.log('Change Password Page Loaded');
  }

  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  toggleNewPassword() {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Password Updated:', this.passwordForm.value);
      this.snackBar.open('Password updated successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/profile']);
    } else {
      this.passwordForm.markAllAsTouched();
      this.snackBar.open('Please fix the highlighted errors.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

}
