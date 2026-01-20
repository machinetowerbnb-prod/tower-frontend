import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loaders } from './features/loader/loader';

import { PwaInstallService } from './services/pwa-install.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loaders],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Mission Tower BNB');

  constructor(private pwaInstall: PwaInstallService) {
    console.log('App started – PWA service initialized');
  }


}
