import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule,TopNav],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword implements OnInit {

  form: any;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService,) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: (group: any) => this.matchPasswords(group)
      }
    );
  }

  matchPasswords = (group: any) => {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  };

  goBack() {
    this.router.navigate(['/profile']);
  }

  updatePassword() {
    const email = localStorage.getItem('email');
    let payload = {
      "email": email,
      "password": this.form.value.newPassword
    }
    console.log(payload);

    this.auth.changePassword(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          console.log("Done 200")
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 1000)
        }
      },
      error: (err) => {
        console.error("Password changed", err);
      }
    });

  }

}
