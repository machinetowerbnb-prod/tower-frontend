import { Component, OnInit, OnDestroy, ViewChild, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Deposit } from '../deposit/deposit';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, Deposit],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService,
    private clipboard: Clipboard,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  @ViewChild('depositModal') depositModal!: Deposit;

  // --- Carousel images: included sample of your uploaded file for testing ---
  carouselImages = [
    '/corosule1.svg',
    '/corosule2.svg',
    '/corosule3.svg',
    '/corosule4.svg',
    // '/mnt/data/69a44b5e-e831-48f2-8510-edfc3f298269.png' // <- your uploaded image path (for testing)
  ];

  walletActions = [
    { icon: '/deposit.svg', label: 'Deposit' },
    { icon: '/withdrawal.svg', label: 'Withdrawal' },
    { icon: '/history.svg', label: 'History' },
    { icon: '/group.svg', label: 'Group' }
  ];

  currentIndex = 0;
  intervalId: any;
  showSupport = false;

  // Swipe helpers
  private touchStartX = 0;
  private touchCurrentX = 0;
  private isSwiping = false;
  private swipeThreshold = 50; // px to consider as swipe

  // fade helper for smooth transition
  isFading = false;
  fadeTimeout: any;

  workingWallet: string = '0';
  withdrawalWallet: string = '0';
  referralLink: string = '';
  bannerLink: string = '';
  refferalCode: string = '';

  get currentImage() {
    return this.carouselImages[this.currentIndex];
  }

  ngOnInit() {
    this.startCarousel();
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.safeGetLocalStorage('userId');
      if (userId) this.loadHomeData();
    }
  }

  onDepositCompleted() {
  console.log('✅ Deposit completed — refreshing home data immediately');
  this.loadHomeData();
  this.cdr.detectChanges(); // ensures immediate UI update in zoneless mode
}

  loadHomeData() {
    const userId = this.safeGetLocalStorage('userId');
    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }

    const payload = {
      screen: 'home',
      userId
    };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.workingWallet = res.data.totalDeposits;
          this.withdrawalWallet = res.data.totalEarnings;
          this.referralLink = res.data.refferalLink;
          this.bannerLink = res.data.bannerLink;
          this.refferalCode = res.data.refferalCode;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error fetching home data:', err);
      }
    });
  }

  copyReferralLink() {
    if (this.referralLink) {
      this.clipboard.copy(this.referralLink);
      alert('Referral link copied!');
    }
  }

  openBannerLink() {
    if (this.bannerLink) {
      window.open(this.bannerLink, '_blank');
    }
  }

  onWalletAction(label: string) {
    if (label === 'Deposit') {
      this.depositModal.openModal();
    } else if (label === 'Withdrawal') {
      this.router.navigate(['/withdraw']);
    } else if (label === 'History') {
      this.router.navigate(['/history']);
    } else if (label === 'Group') {
      this.openSupportPopup();
    }
  }

  openSupportPopup() {
    this.showSupport = true;
  }

  closeSupportPopup() {
    this.showSupport = false;
  }

  // ---------- CAROUSEL ----------

  startCarousel() {
    this.clearCarousel();

    // run inside Angular zone and ensure change detection applied
    this.intervalId = setInterval(() => {
      // use ngZone.run to ensure UI updates reliably
      this.ngZone.run(() => {
        this.nextSlide();
      });
    }, 3000); // set to 3000 ms for smoother testing; change to 5000 if needed
  }

  clearCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // public method for dot click
  setCurrentSlide(index: number) {
    if (index === this.currentIndex) {
      // restart timer
      this.restartCarousel();
      return;
    }

    this.changeSlide(index);
    this.restartCarousel();
  }

  private changeSlide(index: number) {
    // small fade effect for UX
    this.triggerFade();
    this.currentIndex = index % this.carouselImages.length;
    this.cdr.detectChanges();
  }

  private nextSlide() {
    const next = (this.currentIndex + 1) % this.carouselImages.length;
    this.changeSlide(next);
  }

  private prevSlide() {
    const prev = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    this.changeSlide(prev);
  }

  private restartCarousel() {
    this.clearCarousel();
    this.startCarousel();
  }

  // Image load handler to end fade (optional)
  onImageLoad() {
    // keep short delay then remove fade flag
    if (this.fadeTimeout) clearTimeout(this.fadeTimeout);
    this.fadeTimeout = setTimeout(() => {
      this.isFading = false;
      this.cdr.detectChanges();
    }, 250);
  }

  private triggerFade() {
    this.isFading = true;
    this.cdr.detectChanges();
  }

  // ---------- SWIPE HANDLERS ----------
  onTouchStart(evt: TouchEvent) {
    if (!evt.touches || evt.touches.length === 0) return;
    this.isSwiping = true;
    this.touchStartX = evt.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
    // pause auto play while swiping
    this.clearCarousel();
  }

  onTouchMove(evt: TouchEvent) {
    if (!this.isSwiping || !evt.touches || evt.touches.length === 0) return;
    this.touchCurrentX = evt.touches[0].clientX;
  }

  onTouchEnd() {
    if (!this.isSwiping) return;
    const deltaX = this.touchCurrentX - this.touchStartX;
    this.isSwiping = false;

    if (Math.abs(deltaX) > this.swipeThreshold) {
      if (deltaX < 0) {
        // left swipe: next
        this.nextSlide();
      } else {
        // right swipe: prev
        this.prevSlide();
      }
    } // else treat as tap/no-swipe; do nothing

    // resume autoplay
    this.restartCarousel();
  }

  // ---------- life cycle ----------
  ngOnDestroy() {
    this.clearCarousel();
  }

  // ---------- helpers ----------
  private safeGetLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  }
}
