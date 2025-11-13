import { Component, Renderer2 } from '@angular/core';
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

  constructor(private renderer: Renderer2) {}

  openModal() {
    if (this.isClosing) return;
    this.isVisible = true;
    this.isClosing = false;

    // ✅ prevent scroll
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'position', 'fixed');
    this.renderer.setStyle(document.body, 'width', '100%');
    window.scrollTo(0, 0);
  }

  closeModal() {
    if (this.isClosing) return;
    this.isClosing = true;

    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;

      // ✅ restore scroll cleanly
      this.renderer.removeStyle(document.body, 'overflow');
      this.renderer.removeStyle(document.body, 'position');
      this.renderer.removeStyle(document.body, 'width');
    }, 300); // match fade-out time
  }
}
