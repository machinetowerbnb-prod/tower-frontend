import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TopNav } from '../top-nav/top-nav';

import { TranslatePipe } from '../../pipes/translate-pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  imports: [CommonModule, MatButtonModule, TopNav, TranslatePipe, RouterModule],
  templateUrl: './email-confirmation.html',
  styleUrl: './email-confirmation.scss'
})
export class EmailConfirmation {

}
