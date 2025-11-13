import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-success-screen',
  imports: [CommonModule],
  templateUrl: './game-success-screen.html',
  styleUrl: './game-success-screen.scss'
})
export class GameSuccessScreen {
  isVisible = false;
  isClosing = false;

  openModal() {
    this.isVisible = true;
    this.isClosing = false;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      document.body.style.overflow = 'auto';
    }, 300); // sync with fade-out animation
  }
}