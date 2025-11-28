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

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // ✔ Backend API RESPONSE (static for now)
    this.data = {
      "track_id": "112850141",
      "network": "Tron Network",
      "address": "TAYDGM48oyMshARPvDkHpQkkEyyPxaUYG3",
      "memo": "",
      "qr_code": "https://api.qrserver.com/v1/create-qr-code/?data=tron:TAYDGM48oyMshARPvDkHpQkkEyyPxaUYG3&size=150x150",
      "date": 1764335914
    };

    this.startTimerFromBackend();
  }

  startTimerFromBackend() {
    const backendTime = this.data.date * 1000;
    const now = Date.now();
    const elapsed = Math.floor((now - backendTime) / 1000);

    this.countdownSeconds = 180 - elapsed; // 3 minutes

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


}