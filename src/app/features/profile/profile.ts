import {
  Component,
  ViewChild,
  OnInit,
  Inject,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Deposit } from '../deposit/deposit';
import { Transfer } from '../transfer/transfer';
import { AuthService } from '../../services/auth.service';
import { IndexedDbService } from '../../core/storage/indexed-db.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, MatIconModule, Deposit, Transfer, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  private authService = inject(AuthService);
  private indexedDbService = inject(IndexedDbService); // ✅ ADD
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('depositModal') depositModal!: Deposit;
  @ViewChild('transferModal') transferModal!: Transfer;

  showTimer = false;
  showSupport = false;
  showLogout = false;
  amount = 0;

  countdown = {
    days: 0,
    hours: 0,
    minutes: 0
  };

  private countdownInterval: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  user = {
    name: 'Admin',
    email: 'admin@gmail.com',
    workingWallet: 0,
    withdrawalWallet: 0,
  };

  telegramLinkTwo: string = '';
  telegramLinkThree: string = '';

  walletActions = [
    { icon: '/deposit.svg', label: 'Deposit' },
    { icon: '/withdrawal.svg', label: 'Withdrawal' },
    { icon: '/history.svg', label: 'History' },
    { icon: '/group.svg', label: 'Group' }
  ];

  walletSummary = [
    { label: "Today's Personal commission", value: 0 },
    { label: 'Team daily commission', value: 0 },
    { label: 'Grand Total commission', value: 0 },
    { label: 'Your Flexible Deposit', value: 0 },
    { label: 'Your Total withdrawals', value: 0 }
  ];

  settings = [
    { label: 'Change password' },
    { label: 'Terms and conditions' },
    { label: 'Help & support' }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getProfileData(userId);
      }
    }
  }

  // ----------------------------------------------------------------------
  // 🔥 PROFILE API + OFFLINE CACHE
  // ----------------------------------------------------------------------
  getProfileData(userId: string) {
    const cacheKey = `profile_${userId}`;

    const payload = {
      screen: 'profile',
      userId: userId,
    };

    this.authService.avengers(payload).subscribe({
      next: async (res) => {
        if (res.statusCode === 200 && res.data) {
          // ✅ SAVE TO INDEXED DB
          await this.indexedDbService.set('cache', cacheKey, res.data);

          this.applyProfileData(res.data);
        }
      },
      error: async () => {
        // 🔁 OFFLINE FALLBACK
        const cached = await this.indexedDbService.get<any>('cache', cacheKey);
        if (cached) {
          this.applyProfileData(cached);
        }
      }
    });
  }

  // 🔒 EXISTING LOGIC REUSED (NO CHANGE)
  private applyProfileData(data: any) {
    this.ngZone.run(() => {
      this.user.name = data.name || 'User';
      this.user.email = data.email || 'Email';
      this.user.workingWallet = Number(data.totalDeposits ?? 0);
      this.user.withdrawalWallet = Number(data.totalEarnings ?? 0);

      this.telegramLinkTwo = data.telegramLinkTwo;
      this.telegramLinkThree = data.telegramLinkThree;

      this.walletSummary = [
        { label: "Today's Personal commission", value: Number(data.usersTodaysCommission ?? 0) },
        { label: 'Team daily commission', value: Number(data.teamDailyCommission ?? 0) },
        { label: 'Grand Total commission', value: Number(data.grandTotalCommission ?? 0) },
        { label: 'Your Flexible Deposit', value: Number(data.flexibleDeposite ?? 0) },
        { label: 'Your Total withdrawals', value: Number(data.totalWithdrawals ?? 0) }
      ];

      if (data.levelPurchasedAt == null) {
        this.showTimer = false;
      } else {
        this.startCooldownCountdown(data.levelPurchasedAt);
        this.showTimer = true;
      }

      this.cdr.detectChanges();
    });
  }

  // ----------------------------------------------------------------------

  getInitials(name: string): string {
    const parts = name.trim().split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2).toUpperCase();
  }

  onWalletAction(label: string) {
    if (label === 'Deposit') {
      this.depositModal.openModal();
    } else if (label === 'Withdrawal') {
      this.router.navigate(['/withdraw']);
    } else if (label === 'History') {
      this.router.navigate(['/history']);
    } else if (label === 'Group') {
      this.opentelegramLinkTwo();
    } else if (label == 'Transfer') {
      this.transferModal.openModal();
    }
  }

  opentelegramLinkTwo() {
    if (this.telegramLinkTwo) {
      window.open(this.telegramLinkTwo, '_blank');
    }
  }

  openSupportPopup() {
    this.showSupport = true;
  }

  closeSupportPopup() {
    this.showSupport = false;
  }

  onSupport() {
    if (this.telegramLinkThree) {
      window.open(this.telegramLinkThree, '_blank');
    }
  }

  onSetting(label: string) {
    if (label == 'Terms and conditions') {
      this.router.navigate(['/t&c']);
    } else if (label == 'Help & support') {
      this.openSupportPopup();
    } else if (label == 'Change password') {
      localStorage.setItem("email", this.user.email)
      this.router.navigate(['/change-password']);
    }
  }

  logout() {
    this.showLogout = true;
  }

  confirmLogout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/signin']);
  }

  closeLogout() {
    this.showLogout = false
  }

  onTransferClosed() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getProfileData(userId);
      }
    }
  }

  startCooldownCountdown(startTimestamp: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    const startTime = startTimestamp;
    const cooldownPeriod = 120 * 24 * 60 * 60 * 1000;
    const endTime = startTime + cooldownPeriod;

    if (this.countdownInterval) clearInterval(this.countdownInterval);

    const updateCountdown = () => {
      const now = Date.now();
      let diff = endTime - now;
      if (diff < 0) diff = 0;

      const totalMinutes = Math.floor(diff / (1000 * 60));
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      this.ngZone.run(() => {
        this.countdown = { days, hours, minutes };
        this.cdr.detectChanges();
      });

      if (diff === 0 && this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 60 * 1000);
  }
}