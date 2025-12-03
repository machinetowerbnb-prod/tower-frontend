import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TopNav } from '../top-nav/top-nav';
import { Router } from '@angular/router';

import { TranslatePipe } from '../../pipes/translate-pipe';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, MatButtonModule, TopNav, TranslatePipe, RouterModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss'
})
export class VerifyEmail implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.router.navigate(['/signin']), 50000);
  }

}
