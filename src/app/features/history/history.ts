import { Component, OnInit , Inject, PLATFORM_ID,ChangeDetectorRef,NgZone} from '@angular/core';
import { CommonModule ,isPlatformBrowser} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';
import { AuthService } from '../../services/auth.service';
interface Transaction {
  type: string;
  amount: number;
  timestamp: string;
  transactionId: string;
  status: string;
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
  isLoading = true;
  errorMessage = '';

  constructor(private router: Router,
     private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.fetchTransactionHistory(userId);
      } else {
        this.isLoading = false;
        this.errorMessage = 'User ID not found.';
      }
    }
  }

  fetchTransactionHistory(userId: string) {
    const payload = {
      screen: 'history',
      userId: userId,
    };

    this.isLoading = true;

    this.authService.avengers(payload).subscribe({
      next: (response) => {
        console.log('✅ History API response:', response);
        this.isLoading = false;

        if (response.statusCode === 200 && response.data?.transactions) {
          this.ngZone.run(() => {
          this.transactions = response.data.transactions.map((t: any) => ({
            ...t,
            amount: parseFloat(t.amount), // Ensure it's a number
          }));
          this.cdr.detectChanges();
          this.groupTransactions();
        })
        } else {
          this.errorMessage = 'No transactions found.';
          this.transactions = [];
          this.groupedTransactions = [];
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch transaction history:', err);
        this.isLoading = false;
        this.errorMessage = 'Failed to load transaction history. Please try again.';
      },
    });
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
      value: 'withdraw'
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
    this.showFilter = false;

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
