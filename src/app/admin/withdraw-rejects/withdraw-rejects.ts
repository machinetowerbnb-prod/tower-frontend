import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdraw-rejects',
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw-rejects.html',
  styleUrl: './withdraw-rejects.scss'
})
export class WithdrawRejects implements OnInit {
  withdraws: any[] = [];
  filteredWithdraws: any[] = [];
  paginatedWithdraws: any[] = [];

  itemsPerPage = 10;
  currentPage = 1;
  searchText = '';

  ngOnInit() {
    this.withdraws = [
      { user: 'Haitham', amount: 20, charge: 2, total: 18, wallet: '0x3424...', network: 'bep' },
      { user: 'chnservis', amount: 30, charge: 3, total: 27, wallet: '0x45cc...', network: 'trc' },
      { user: 'Fira82', amount: 50, charge: 5, total: 45, wallet: '0x424d...', network: 'bep' },
    ];

    this.filteredWithdraws = [...this.withdraws];
    this.updatePagination();
  }

  get totalPages() {
    return Math.ceil(this.filteredWithdraws.length / this.itemsPerPage);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedWithdraws = this.filteredWithdraws.slice(start, end);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }

  filterWithdraws() {
    const text = this.searchText.toLowerCase().trim();

    this.filteredWithdraws = this.withdraws.filter(w =>
      Object.values(w).some(v =>
        v !== null &&
        v !== undefined &&
        v.toString().toLowerCase().includes(text)
      )
    );

    this.currentPage = 1;
    this.updatePagination();
  }

  copyWallet(wallet: string) {
    navigator.clipboard.writeText(wallet);
    alert('Wallet address copied!');
  }
}
