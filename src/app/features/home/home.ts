import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Deposit } from '../deposit/deposit';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, Deposit],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  constructor(private router: Router) { }


  @ViewChild('depositModal') depositModal!: Deposit;

  carouselImages = [
    '/corosule1.svg',
    '/corosule2.svg',
    '/corosule3.svg',
    '/corosule4.svg'
  ];

  walletActions = [
    { icon: '/deposit.svg', label: 'Deposit' },
    { icon: '/withdrawal.svg', label: 'Withdrawal' },
    { icon: '/history.svg', label: 'History' },
    { icon: '/support.svg', label: 'Support' }
  ];

  currentIndex = 0;
  intervalId: any;
  showSupport = false;


  get currentImage() {
    return this.carouselImages[this.currentIndex];
  }

  ngOnInit() {
    this.startCarousel();
  }

  onWalletAction(label: string) {
    if (label === 'Deposit') {
      this.depositModal.openModal();
    } else if (label === 'Withdrawal') {
      this.router.navigate(['/withdraw']);
    } else if (label === 'History') {
      this.router.navigate(['/history']);
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

  startCarousel() {
    this.clearCarousel();

    // Keep inside Angular so UI updates
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
      // console.log('Changing image:', this.currentIndex);
    }, 1000); // Change to 5000 after testing
  }

  setCurrentSlide(index: number) {
    this.currentIndex = index;
    this.startCarousel();
  }

  clearCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    this.clearCarousel();
  }
}
