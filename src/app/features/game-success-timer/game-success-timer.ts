import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game-success-timer',
  imports: [CommonModule],
  templateUrl: './game-success-timer.html',
  styleUrl: './game-success-timer.scss'
})
export class GameSuccessTimer implements OnInit, OnDestroy {
  @Input() startTimestamp!: number; // 🟢 time sent from Game component

  isVisible = false;
  hours = '00';
  minutes = '00';
  seconds = '00';
  endTime!: number;
  intervalId: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  // 🟢 Triggered when opened
  openModal() {
    this.isVisible = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    // If time provided, use it. Else, use current time
    const start = this.startTimestamp ? this.startTimestamp : new Date().getTime();
    this.endTime = start + 24 * 60 * 60 * 1000; // 24 hours countdown
    this.startCountdown();
  }

  // 🟢 Close modal
  closeModal() {
    this.isVisible = false;
    this.renderer.removeStyle(document.body, 'overflow');
    clearInterval(this.intervalId);
  }

  startCountdown() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.endTime - now;

      if (distance <= 0) {
        clearInterval(this.intervalId);
        this.hours = this.minutes = this.seconds = '00';
        return;
      }

      const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const m = Math.floor((distance / (1000 * 60)) % 60);
      const s = Math.floor((distance / 1000) % 60);

      this.hours = this.format(h);
      this.minutes = this.format(m);
      this.seconds = this.format(s);
    }, 1000);
  }

  private format(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
