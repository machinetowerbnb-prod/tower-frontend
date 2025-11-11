import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface GameCard {
  title: string;
  reward: string;
  validity: string;
  status?: string;
  miningCycle?: string;
  buttonText: string;
  background: string;
  enabled: boolean;
  disableType?: 'button' | 'card';
}

@Component({
  selector: 'app-game',
  imports: [CommonModule, RouterModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnInit {
  cards: GameCard[] = [];

  ngOnInit() {
    this.cards = [
      {
        title: 'Tower BNB - Free Trial',
        reward: 'Earn 8 USDT',
        validity: 'CIRCULATION VALIDITY: 1 DAY',
        buttonText: 'Unlock Now',
        background: '/assets/tower_free.png',
        enabled: true,
        disableType: 'button'
      },
      {
        title: 'Core 1G Tower Computing',
        reward: 'Status: Pending Activation',
        validity: 'CIRCULATION VALIDITY: 120 DAYS',
        status: 'DEP : 60-500 USDT',
        miningCycle: 'Earn: 1.6% per day',
        buttonText: 'Purchase Now',
        background: '/assets/tower_core10.png',
        enabled: true,
        disableType: 'button'
      },
      {
        title: 'Core 2G Tower Computing',
        reward: 'Status: Pending Activation',
        validity: 'CIRCULATION VALIDITY: 120 DAYS',
        status: 'DEP : 501-900 USDT',
        miningCycle: 'Earn: 1.9% per day',
        buttonText: 'Purchase Now',
        background: '/assets/tower_core10.png',
        enabled: true,
        disableType: 'button'
      },
      {
        title: 'Core 3G Tower Computing',
        reward: 'Status: Pending Activation',
        validity: 'CIRCULATION VALIDITY: 120 DAYS',
        status: 'DEP : 901-1500 USDT',
        miningCycle: 'Earn: 2.3% per day',
        buttonText: 'Purchase Now',
        background: '/assets/tower_core10.png',
        enabled: true,
        disableType: 'button'
      },
      {
        title: 'Core 30 Tower Computing',
        reward: 'Earn 48 USDT',
        validity: 'CIRCULATION VALIDITY 30 DAYS',
        status: 'Stable Mining Operation',
        miningCycle: '27 days mining cycle',
        buttonText: 'Purchase Now',
        background: '/assets/tower_core30.png',
        enabled: false,
        disableType: 'card' // 🔹 disabled (Coming Soon)
      }
    ];
  }

  onAction(card: GameCard) {
    if (!card.enabled && card.disableType === 'button') return;
    if (card.disableType === 'card') return;
    console.log('Clicked:', card.title);
  }
}

