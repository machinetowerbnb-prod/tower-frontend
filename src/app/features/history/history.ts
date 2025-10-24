import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';

interface Transaction {
  type: string;
  amount: number;
  timestamp: string;
  transactionId: string;
}


@Component({
  selector: 'app-history',
  imports: [CommonModule, RouterModule, TopNav],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History implements OnInit {

  transactions: Transaction[] = [];
  groupedTransactions: { date: string; transactions: Transaction[] }[] = [];
  showFilter = false;
  activeFilter = 'all';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // 🔹 Hardcoded API data
    const response = {
      statusCode: 200,
      message: 'success',
      data: {
        transactions: [
          {
            type: 'credit',
            amount: 2000.2,
            timestamp: '2025-10-25T07:54:15.149Z',
            transactionId: 'AACNGXR76IGUU3FAINLZDWX',
          },
          {
            type: 'credit',
            amount: 2000.2,
            timestamp: '2025-10-24T07:54:15.149Z',
            transactionId: 'AACNGXR76IGUU3FAINLZDWX',
          },
          {
            type: 'credit',
            amount: 2000.2,
            timestamp: '2025-10-24T07:54:15.149Z',
            transactionId: 'JHGNGXR76IGUU3FAINLZDWX',
          },
          {
            type: 'deposit',
            amount: 2000.2,
            timestamp: '2025-10-23T07:54:15.149Z',
            transactionId: 'ERTNGXR76IGUU3FAINLZDWX',
          },
          {
            type: 'deposit',
            amount: 2000.2,
            timestamp: '2025-10-22T07:54:15.149Z',
            transactionId: 'NBVNGXR76IGUU3FAINLZDWX',
          },
          {
            type: 'reward',
            amount: 2000.2,
            timestamp: '2025-10-21T07:54:15.149Z',
            transactionId: 'MJKNGXR76IGUU3FAINLZDWX',
          },
          {
            type: 'reward',
            amount: 2000.2,
            timestamp: '2025-10-21T07:54:15.149Z',
            transactionId: 'POINGXR76IGUU3FAINLZDWX',
          },
        ],
      },
    };

    this.transactions = response.data.transactions;
    this.groupTransactions();
  }

  filters = [
    {
      label: 'Your deposits',
      desc: 'See all your top-ups.',
      icon: '/credits-filter.svg',
      value: 'deposit'
    },
    {
      label: 'Your withdrawals',
      desc: 'View recent cashouts.',
      icon: '/deposits-filter.svg',
      value: 'credit'
    },
    {
      label: 'Commission & rewards',
      desc: 'Check your earnings.',
      icon: '/rewards-filter.svg',
      value: 'reward'
    }
  ];

  groupTransactions() {
    const today = new Date().toDateString();
    const groups: { [key: string]: Transaction[] } = {};

    // ✅ Sort by timestamp descending
    const sorted = [...this.transactions].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // ✅ Group by date
    sorted.forEach((tx) => {
      const txDate = new Date(tx.timestamp);
      const formattedDate =
        txDate.toDateString() === today
          ? 'Today'
          : txDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(tx);
    });

    // ✅ Convert object → array and preserve descending date order
    this.groupedTransactions = Object.entries(groups)
      .map(([date, transactions]) => ({ date, transactions }))
      .sort((a, b) => {
        if (a.date === 'Today') return -1;
        if (b.date === 'Today') return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }


  dateSortFn = (a: any, b: any): number => {
    // Keep "Today" always on top
    if (a.key === 'Today') return -1;
    if (b.key === 'Today') return 1;

    // Sort by actual date (descending)
    const dateA = new Date(a.key).getTime();
    const dateB = new Date(b.key).getTime();
    return dateB - dateA;
  };


  goBack() {
    console.log("goBack")
    this.router.navigate(['/home']);
  }


  openFilterPopup() {
    this.showFilter = true;
  }

  closeFilterPopup() {
    this.showFilter = false;
  }

  selectFilter(value: string) {
    this.activeFilter = value;
    // this.showFilter = false;

    // 🔹 Re-filter transactions
    const filtered =
      value === 'all'
        ? this.transactions
        : this.transactions.filter((tx) => tx.type === value);

    this.groupTransactionsBy(filtered);
  }

  // Helper to regroup by filtered list
  private groupTransactionsBy(transactions: Transaction[]) {
    const today = new Date().toDateString();
    const groups: { [key: string]: Transaction[] } = {};

    const sorted = [...transactions].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    sorted.forEach((tx) => {
      const txDate = new Date(tx.timestamp);
      const formattedDate =
        txDate.toDateString() === today
          ? 'Today'
          : txDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(tx);
    });

    this.groupedTransactions = Object.entries(groups)
      .map(([date, transactions]) => ({ date, transactions }))
      .sort((a, b) => {
        if (a.date === 'Today') return -1;
        if (b.date === 'Today') return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }



}
