import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  imports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss'
})
export class Deposit {
  isVisible = false;
  isClosing = false;
  amount: number | null = null;
  selectedToken = 'USDT';
  quickAmounts = [500, 1000, 2000, 5000];
  compoletedDeposit = false;

  openModal() {
    this.isVisible = true;
    this.isClosing = false;
    document.body.style.overflow = 'hidden';
  }

  animateClose() {
    // 🌀 trigger rotation + slide animation
    if (this.isClosing) return; // prevent double clicks
    this.isClosing = true;

    const icon = document.querySelector('.close-icon');
    icon?.classList.add('rotate-close');

    // Wait for animation to finish before hiding popup
      icon?.classList.remove('rotate-close');
      this.closeModal();
  }

  closeModal() {
    this.isVisible = false;
    this.isClosing = false;
    this.compoletedDeposit = false;
    document.body.style.overflow = 'auto';
  }

  setAmount(value: number) {
    this.amount = value;
  }

  selectToken(token: string) {
    this.selectedToken = token;
  }

  confirmDeposit() {
    // if (!this.amount) return;
    console.log('Deposit Confirmed:', this.amount, this.selectedToken);
    this.compoletedDeposit = true;
    // this.closeModal();
  }
}
