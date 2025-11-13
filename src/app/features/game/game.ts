import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameSuccessScreen } from '../game-success-screen/game-success-screen';
import { GameSuccessTimer } from '../game-success-timer/game-success-timer';


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
  imports: [CommonModule, RouterModule, GameSuccessScreen, GameSuccessTimer],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnInit {

  constructor() { }

  cards: GameCard[] = [];

  @ViewChild('gameSuccessModel') gameSuccessModel!: GameSuccessScreen;
  @ViewChild('timerPopup') timerPopup!: GameSuccessTimer;



  ngOnInit() {
    this.cards = [
      {
        title: 'Tower BNB - Free Trial',
        reward: 'Earn 8 USDT',
        validity: 'CIRCULATION VALIDITY: 1 DAY',
        buttonText: 'Activated',
        background: '/game-card-1.svg',
        enabled: false,
        disableType: 'button'
      },
      {
        title: 'Core 1G Tower Computing',
        reward: 'Status: Pending Activation',
        validity: 'CIRCULATION VALIDITY: 120 DAYS',
        status: 'DEP : 60-500 USDT',
        miningCycle: 'Earn: 1.6% per day',
        buttonText: 'Purchase Now',
        background: '/game-card-2.svg',
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
        background: '/game-card-3.svg',
        enabled: false,
        disableType: 'button'
      },
      {
        title: 'Core 3G Tower Computing',
        reward: 'Status: Pending Activation',
        validity: 'CIRCULATION VALIDITY: 120 DAYS',
        status: 'DEP : 901-1500 USDT',
        miningCycle: 'Earn: 2.3% per day',
        buttonText: 'Purchase Now',
        background: '/game-card-4.svg',
        enabled: false,
        disableType: 'button'
      },
      {
        title: 'Core 30 Tower Computing',
        reward: 'Earn 48 USDT',
        validity: 'CIRCULATION VALIDITY 30 DAYS',
        status: 'Stable Mining Operation',
        miningCycle: '27 days mining cycle',
        buttonText: 'Purchase Now',
        background: '/game-card-5.svg',
        enabled: false,
        disableType: 'card' // 🔹 disabled (Coming Soon)
      }
    ];
  }

  onAction(card: GameCard) {
    if (!card.enabled && card.disableType === 'button') return;
    if (card.disableType === 'card') return;
    console.log('Clicked:', card);
    // this.gameSuccessModel.openModal();

    const startTime = new Date().getTime();
    this.timerPopup.startTimestamp = startTime;
    this.timerPopup.openModal();
  }
}

