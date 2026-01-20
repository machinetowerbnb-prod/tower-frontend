import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt: any = null;
  public canInstall = false;

  constructor() {
    console.log('PWA service constructor running');

    window.addEventListener('beforeinstallprompt', (event: any) => {
      console.log('🔥 beforeinstallprompt fired');

      event.preventDefault();   // REQUIRED
      this.deferredPrompt = event;
      this.canInstall = true;   // 🔥 Login popup trigger
    });

    window.addEventListener('appinstalled', () => {
      console.log('✅ App installed');
      this.deferredPrompt = null;
      this.canInstall = false;
    });
  }

  async install() {
    console.log('INSTALL clicked');

    if (!this.deferredPrompt) {
      alert('Chrome menu → Install app');
      return;
    }

    this.deferredPrompt.prompt();
    await this.deferredPrompt.userChoice;

    this.deferredPrompt = null;
    this.canInstall = false;
  }
}