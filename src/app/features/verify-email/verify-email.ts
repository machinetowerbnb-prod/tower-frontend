import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TopNav } from '../top-nav/top-nav';

import { TranslatePipe } from '../../pipes/translate-pipe';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, MatButtonModule, TopNav, TranslatePipe, RouterModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss'
})
export class VerifyEmail {

}
