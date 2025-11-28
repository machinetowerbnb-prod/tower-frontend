import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-deposit-oxapay',
  imports: [CommonModule, RouterModule, TopNav],
  templateUrl: './deposit-oxapay.html',
  styleUrl: './deposit-oxapay.scss'
})
export class DepositOxapay implements OnInit {
  data: any = null;

  countdownSeconds = 180; // 3 minutes
  countdownText = '';
  intervalRef: any;
  showCopyChip = true;
  pollingRef: any;
  pollingAttempts = 0;


  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const payData = JSON.parse(localStorage.getItem("pay") || "{}");
    this.data = payData;
    this.startTimerFromBackend();
  }

  startTimerFromBackend() {
    const backendTime = this.data.date * 1000;
    const now = Date.now();
    const elapsed = Math.floor((now - backendTime) / 1000);

    this.countdownSeconds = 180 - elapsed;

    if (this.countdownSeconds < 0) this.countdownSeconds = 0;

    this.updateCountdownText();

    this.ngZone.runOutsideAngular(() => {
      this.intervalRef = setInterval(() => {
        this.ngZone.run(() => {
          if (this.countdownSeconds > 0) {
            this.countdownSeconds--;
            this.updateCountdownText();
            this.cdr.detectChanges();
          } else {
            clearInterval(this.intervalRef);
            this.countdownText = 'Checking deposit status…';
            this.cdr.detectChanges();
            this.startPaymentCheck();
          }
        });
      }, 1000);
    });
  }

  updateCountdownText() {
    const min = Math.floor(this.countdownSeconds / 60);
    const sec = this.countdownSeconds % 60;

    this.countdownText = `Please wait for ${min} min ${sec
      .toString()
      .padStart(2, '0')} sec Do not go back, refresh, or close this page.`;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  copy(text: string) {
    if (!text) return;
    navigator.clipboard.writeText(text);
  }

  ngOnDestroy() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

  getMaskedAddress(addr: string): string {
    if (!addr) return "";
    if (addr.length <= 10) return addr;

    return addr.substring(0, 10) + "..." + addr.substring(addr.length - 10);
  }

  copyToClipboard(text: string) {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => this.showCopyChip = true)
      .catch(() => alert("Copy failed"));

    setTimeout(() => this.showCopyChip = false, 2000);
  }

  startPaymentCheck() {
    const trackId = this.data.track_id;
    console.log("trackId",trackId);

    if (!trackId) {
      console.error("❌ No track_id found in pay data");
      return;
    }

    this.callPaymentStatus(trackId);

    // Now start polling for next 1 minute (12 attempts × 5 seconds)
    this.pollingAttempts = 0;

    this.pollingRef = setInterval(() => {
      this.pollingAttempts++;

      if (this.pollingAttempts >= 12) {
        clearInterval(this.pollingRef);
        this.countdownText = "Payment not detected. Please try again.";
        this.cdr.detectChanges();
        return;
      }

      this.callPaymentStatus(trackId);

    }, 5000);
  }

  callPaymentStatus(trackId: string) {
    const payload = { track_id: trackId };
    this.authService.paymentStatus(payload).subscribe({
      next: (res) => {
        console.log("Payment Status:", res);
        if (res.status === "paid" || res.data?.status === "paid") {
          clearInterval(this.pollingRef);
          this.countdownText = "Payment received successfully!";
          this.cdr.detectChanges();
          // 🚀 Redirect Home or Success
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error("Payment check failed:", err);
      }
    });
  }




}