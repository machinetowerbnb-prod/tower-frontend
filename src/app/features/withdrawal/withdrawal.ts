import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopNav } from '../top-nav/top-nav'


@Component({
  selector: 'app-withdrawal',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TopNav ],
  templateUrl: './withdrawal.html',
  styleUrl: './withdrawal.scss'
})
export class Withdrawal {

  withdrawalForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.withdrawalForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(20)]],
      walletAddress: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.withdrawalForm.valid) {
      alert('Withdrawal request submitted successfully!');
      this.router.navigate(['/home']);
    } else {
      this.withdrawalForm.markAllAsTouched();
    }
  }

  goBack() {
    console.log("juhygf")
    this.router.navigate(['/home']);
  }

}
