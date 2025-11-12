import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UpdateAmount } from '../update-amount/update-amount';

@Component({
  selector: 'app-users',
  imports: [CommonModule, MatIconModule, FormsModule, UpdateAmount],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  Math = Math;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  showPopup = false;

  selectedAction = '';
  selectedRow: any = null;


  ngOnInit(): void {
    // Simulated API Response (Replace with real API later)
    
    const response = {
      statusCode: 200,
      message: 'success',
      data: [
        { id: 1, name: 'SaveSYL', email: 'saveangels75@gmail.com', referralId: 'savesyL_153364', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 2, name: 'Amalia05', email: 'codreaamalia@gmail.com', referralId: 'amalia05_981425', wallet: 0, earnings: 0, referrals: 0, status: false },
        { id: 3, name: 'MrKhan', email: 'nader.arman1368@gmail.com', referralId: 'mrkhan_220816', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 4, name: 'Krasimir24', email: 'krasirem@gmail.com', referralId: 'krasimir24_600902', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: false },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
        { id: 5, name: 'Nadia', email: 'nadiaalmasry55@gmail.com', referralId: 'nadia_619189', wallet: 0, earnings: 0, referrals: 0, status: true },
      ]
    };

    this.users = response.data;
    this.filteredUsers = [...this.users];
  }

  // 🔍 Filter users
  searchUsers() {
    const term = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.referralId.toLowerCase().includes(term) ||
        u.wallet.toString().includes(term) ||
        u.earnings.toString().includes(term)
    );
    this.currentPage = 1;
  }

  // 🧭 Pagination
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredUsers.length)
      this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1)
      this.currentPage--;
  }

  // 🟢 Toggle Status
  toggleStatus(user: any) {
    user.status = !user.status;
    console.log('Toggled user:', user);
    // Later: Call API here
  }

  // 💰 Add Wallet/Earnings popup trigger (next step)
  openAddPopup(user: any, field: string) {
    console.log('Open popup for', field, 'of user', user);
  }

  closePopup() {
    this.showPopup = false;
  }

  handleSubmit(data: any) {
    console.log('Popup submitted:', data);
    this.showPopup = false;
  }

  openPopup(action: string, row: any) {
    this.selectedAction = action;
    this.selectedRow = row;
    this.showPopup = true;
  }

}
