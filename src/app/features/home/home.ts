import { Component, OnInit, OnDestroy, ViewChild,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Deposit } from '../deposit/deposit';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  ) { }


  @ViewChild('depositModal') depositModal!: Deposit;

//   ngAfterViewInit() {
//   // No need for manual subscription if the output event is bound in template
//   console.log('Deposit modal ready:', this.depositModal);
// }

onDepositCompleted() {
  console.log('✅ Deposit completed — refreshing home data immediately');
  this.loadHomeData();
  this.cdr.detectChanges(); // ensures immediate UI update in zoneless mode
}


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
  loadHomeData() {
    const userId = this.safeGetLocalStorage('userId'); // make sure you store it at login
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

  // ✅ Copy referral link
  copyReferralLink() {
    if (this.referralLink) {
      this.clipboard.copy(this.referralLink);
      alert('Referral link copied!');
    }
  }

  // ✅ Redirect to banner link
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

private safeSetLocalStorage(key: string, value: string): void {
  if (isPlatformBrowser(this.platformId)) {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.warn('Unable to access localStorage');
    }
  }
}

}
