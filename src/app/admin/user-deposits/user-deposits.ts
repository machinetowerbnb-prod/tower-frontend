import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-deposits',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-deposits.html',
  styleUrl: './user-deposits.scss'
})
export class UserDeposits implements OnInit {

  sampleDeposits = [
    { username: "john_doe", amount: 1200, status: "Success", transactionId: "TXN1001", time: "2025-02-01 10:30 AM" },
    { username: "ram_kumar", amount: 500, status: "Pending", transactionId: "TXN1002", time: "2025-02-01 11:10 AM" },
    { username: "lisa123", amount: 3000, status: "Failed", transactionId: "TXN1003", time: "2025-02-01 12:15 PM" },
    { username: "mahesh98", amount: 800, status: "Success", transactionId: "TXN1004", time: "2025-02-01 01:00 PM" },
    { username: "sunny_star", amount: 450, status: "Success", transactionId: "TXN1005", time: "2025-02-01 01:45 PM" },
    { username: "priya_m", amount: 2200, status: "Pending", transactionId: "TXN1006", time: "2025-02-01 02:00 PM" },
    { username: "jackson", amount: 1800, status: "Success", transactionId: "TXN1007", time: "2025-02-01 02:30 PM" },
    { username: "harsha", amount: 950, status: "Failed", transactionId: "TXN1008", time: "2025-02-01 03:10 PM" },
    { username: "deepika", amount: 1400, status: "Success", transactionId: "TXN1009", time: "2025-02-01 04:05 PM" },
    { username: "vinay", amount: 700, status: "Pending", transactionId: "TXN1010", time: "2025-02-01 04:50 PM" },

    { username: "arjun", amount: 1100, status: "Success", transactionId: "TXN1011", time: "2025-02-02 09:12 AM" },
    { username: "kevin", amount: 3400, status: "Success", transactionId: "TXN1012", time: "2025-02-02 10:00 AM" },
    { username: "rekha", amount: 600, status: "Failed", transactionId: "TXN1013", time: "2025-02-02 11:29 AM" },
    { username: "yusuf", amount: 2500, status: "Success", transactionId: "TXN1014", time: "2025-02-02 12:45 PM" },
    { username: "niharika", amount: 1300, status: "Pending", transactionId: "TXN1015", time: "2025-02-02 01:05 PM" },
    { username: "charan", amount: 950, status: "Success", transactionId: "TXN1016", time: "2025-02-02 02:20 PM" },
    { username: "sanjay", amount: 2800, status: "Failed", transactionId: "TXN1017", time: "2025-02-02 03:00 PM" },
    { username: "megha", amount: 660, status: "Success", transactionId: "TXN1018", time: "2025-02-02 04:40 PM" },
    { username: "pavan", amount: 900, status: "Pending", transactionId: "TXN1019", time: "2025-02-02 05:55 PM" },
    { username: "rajat", amount: 2000, status: "Success", transactionId: "TXN1020", time: "2025-02-02 06:10 PM" }
  ];


  Math = Math;

  deposits: any[] = [];
  filteredDeposits: any[] = [];
  searchText = '';
  pageSize = 10;
  currentPage = 1;

  ngOnInit() {
    this.loadSampleData();
  }

  loadSampleData() {
    this.deposits = [...this.sampleDeposits]; // OR paste JSON directly
    this.filteredDeposits = [...this.deposits];
  }

  get paginatedDeposits() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDeposits.slice(start, start + this.pageSize);
  }

  searchDeposits() {
    const t = this.searchText.toLowerCase();
    this.filteredDeposits = this.deposits.filter(d =>
      d.username.toLowerCase().includes(t) ||
      d.transactionId.toLowerCase().includes(t) ||
      d.status.toLowerCase().includes(t)
    );
    this.currentPage = 1;
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredDeposits.length)
      this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1)
      this.currentPage--;
  }
}
