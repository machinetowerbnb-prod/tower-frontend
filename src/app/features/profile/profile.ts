import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Deposit } from '../deposit/deposit';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, MatIconModule, Deposit],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

  @ViewChild('depositModal') depositModal!: Deposit;

  showSupport = false;

  constructor(private router: Router) { }

  user = {
    name: 'Admin',
    email: 'admin@gmail.com',
    workingWallet: 5000,
    withdrawalWallet: 50000,
  };

  walletActions = [
    { icon: '/deposit.svg', label: 'Deposit' },
    { icon: '/withdrawal.svg', label: 'Withdrawal' },
    { icon: '/history.svg', label: 'History' },
    { icon: '/support.svg', label: 'Support' }
  ];

  walletSummary = [
    { label: "Today's Personal commission", value: 45.5 },
    { label: 'Team daily commission', value: 5200 },
    { label: 'Grand Total commission', value: 250 },
    { label: 'Your Flexible Deposit', value: 1182 },
    { label: 'Your Total withdrawals', value: 6952 }
  ];

  settings = [
    { label: 'Change password' },
    { label: 'Terms and conditions' },
    { label: 'Help & support' }
  ];

  getInitials(name: string): string {
    const parts = name.trim().split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2).toUpperCase();
  }

  onWalletAction(label: string) {
    if (label === 'Deposit') {
      this.depositModal.openModal();
    } else if (label === 'Withdrawal') {
      // this.router.navigate(['/withdraw']);
    } else if (label === 'History') {
      // this.router.navigate(['/history']);
    } else if (label === 'Support') {
      this.openSupportPopup();
    }
  }

  openSupportPopup() {
    this.showSupport = true;
  }

  closeSupportPopup() {
    this.showSupport = false;
  }

  onSetting(label: string) {
    console.log('Clicked setting:', label);
  }

  logout() {
    console.log('Logged out');
    this.router.navigate(['/signin']);
  }

}
