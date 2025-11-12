import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdraw-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw-request.html',
  styleUrl: './withdraw-request.scss'
})
export class WithdrawRequest implements OnInit {
  Math = Math;
  withdraws: any[] = [];
  filteredWithdraws: any[] = [];
  searchText = '';
  itemsPerPage = 10;
  currentPage = 1;

  ngOnInit() {
    // ✅ Mock API data
    this.withdraws = [
      {
        user: 'Haitham',
        amount: 20,
        charge: 2,
        total: 18,
        wallet: '0x342432280b9d60a92775857aed86cad76475448',
        network: 'bep',
        status: 'processing'
      },
      {
        user: 'chnservis',
        amount: 20,
        charge: 2,
        total: 18,
        wallet: '0x45ccf9d91377ddc75c38528b4ad785e45bec64d7',
        network: 'trc',
        status: 'success'
      },
      {
        user: 'Fira82',
        amount: 10,
        charge: 1,
        total: 9,
        wallet: '0x424d8d0e329c59fb353245082a88dc9923e13f',
        network: 'bep',
        status: 'processing'
      },
      {
        user: 'Nguyen Thi Phuong',
        amount: 10,
        charge: 1,
        total: 9,
        wallet: '0xF5977b42E08131d6f8A6EFC0395F218BC2c5Cb',
        network: 'bep',
        status: 'processing'
      }
    ];

    this.filteredWithdraws = [...this.withdraws];
  }

  // ✅ Search function
  filterWithdraws() {
    const text = this.searchText.toLowerCase();
    this.filteredWithdraws = this.withdraws.filter(
      w =>
        w.user.toLowerCase().includes(text) ||
        w.wallet.toLowerCase().includes(text) ||
        w.network.toLowerCase().includes(text) ||
        w.status.toLowerCase().includes(text)
    );
  }

  // ✅ Pagination controls
  get paginatedWithdraws() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredWithdraws.slice(start, start + this.itemsPerPage);
  }

  changePage(offset: number) {
    const totalPages = Math.ceil(this.filteredWithdraws.length / this.itemsPerPage);
    this.currentPage = Math.min(Math.max(this.currentPage + offset, 1), totalPages);
  }

  // ✅ Copy wallet address
  copyWallet(address: string) {
    navigator.clipboard.writeText(address);
    alert('Wallet address copied!');
  }

  handleDecision(action: 'accept' | 'reject', item: any) {
    console.log(`${action.toUpperCase()} clicked for:`, item);
    this.filteredWithdraws = this.filteredWithdraws.filter(w => w !== item);
    this.withdraws = this.withdraws.filter(w => w !== item);

    // Optionally, show message
    const msg =
      action === 'accept'
        ? `${item.user}'s request accepted ✅`
        : `${item.user}'s request rejected ❌`;
    alert(msg);
  }

}
