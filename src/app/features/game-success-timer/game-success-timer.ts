import {
  Component,
  Input,
  Renderer2,
  NgZone,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-game-success-timer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './game-success-timer.html',
  styleUrl: './game-success-timer.scss',
})
export class GameSuccessTimer implements OnDestroy, OnInit {
  isVisible = false;
  isClosing = false;

  hours = '00';
  minutes = '00';
  seconds = '00';

  private targetTime = 0;
  private intervalId: any;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  this.renderer.removeStyle(document.body, 'overflow');
}

  /** Start timer popup */
  open(startTimestamp: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.targetTime = startTimestamp + 24 * 60 * 60 * 1000; // 24 hours

    this.isVisible = true;
    this.isClosing = false;

    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    this.startCountdown();
  }

  /** Main timer logic */
  private startCountdown() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        const now = Date.now();
        let diff = this.targetTime - now;
        if (diff < 0) diff = 0;

        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        this.zone.run(() => {
          this.hours = h.toString().padStart(2, '0');
          this.minutes = m.toString().padStart(2, '0');
          this.seconds = s.toString().padStart(2, '0');

          // 👇 THIS IS THE HERO LINE
          this.cdr.detectChanges();
        });

      }, 1000);
    });

  }

  /** Close popup */
  close() {
    this.isClosing = true;

    // match fade-out animation
    setTimeout(() => {
      if (this.intervalId) clearInterval(this.intervalId);

      // IMPORTANT — remove FIRST
      this.renderer.removeStyle(document.body, 'overflow');

      // Now hide modal
      this.isVisible = false;

    }, 250);
  }


  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.renderer.removeStyle(document.body, 'overflow');
  }
}