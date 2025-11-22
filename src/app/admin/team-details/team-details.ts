import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-team-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './team-details.html',
  styleUrl: './team-details.scss'
})
export class TeamDetails implements OnInit {

  @Input() userEmail = "";

  activeLevel = 1;

  loading = true;
  data: any = null;

  // SEARCH
  searchQuery: any = { 1: "", 2: "", 3: "" };

  // PAGINATION
  currentPage: any = { 1: 1, 2: 1, 3: 1 };
  pageSize = 5;
  totalPages: any = { 1: 1, 2: 1, 3: 1 };

  // FILTERED + PAGINATED DATA
  filtered: any = { 1: [], 2: [], 3: [] };
  paginated: any = { 1: [], 2: [], 3: [] };

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadTeamData();
  }

  loadTeamData() {
    // replace with API call
    setTimeout(() => {
      this.data = {
        genOne: {
          users: [
            { name: "Hariprasad", email: "hari@gmail.com", referralId: "A1B2C3D1", wallet: 2008, earnings: 10.5, referrals: 2, status: true },
            { name: "Madhu", email: "madhu@gmail.com", referralId: "A1B2C3D2", wallet: 545, earnings: 3.1, referrals: 0, status: true },
            { name: "Sravan", email: "sravan@gmail.com", referralId: "A1B2C3D3", wallet: 190.6, earnings: 0.5, referrals: 1, status: false },
            { name: "Mani", email: "mani@gmail.com", referralId: "A1B2C3D4", wallet: 32, earnings: 1.2, referrals: 0, status: true },
            { name: "Vijay", email: "vijay@gmail.com", referralId: "A1B2C3D5", wallet: 12.4, earnings: 0.1, referrals: 0, status: true },
          ]
        },

        genTwo: {
          users: [
            { name: "Raju", email: "raju@gmail.com", referralId: "B1B2C3D1", wallet: 800, earnings: 5.5, referrals: 4, status: true },
            { name: "Kranthi", email: "kranthi@gmail.com", referralId: "B1B2C3D2", wallet: 120, earnings: 0.2, referrals: 1, status: true },
            { name: "Teja", email: "teja@gmail.com", referralId: "B1B2C3D3", wallet: 56, earnings: 0.9, referrals: 0, status: true },
            { name: "Ravi", email: "ravi@gmail.com", referralId: "B1B2C3D4", wallet: 92.7, earnings: 0.6, referrals: 2, status: false },
            { name: "Suresh", email: "suresh@gmail.com", referralId: "B1B2C3D5", wallet: 31.2, earnings: 0.3, referrals: 0, status: true },
          ]
        },

        genThree: {
          users: [
            { name: "Bhargav", email: "bhargav@gmail.com", referralId: "C1B2C3D1", wallet: 40, earnings: 0.0, referrals: 0, status: true },
            { name: "Tarun", email: "tarun@gmail.com", referralId: "C1B2C3D2", wallet: 102, earnings: 1.5, referrals: 1, status: false },
            { name: "Naveen", email: "naveen@gmail.com", referralId: "C1B2C3D3", wallet: 18.5, earnings: 0.3, referrals: 0, status: true },
            { name: "Ajay", email: "ajay@gmail.com", referralId: "C1B2C3D4", wallet: 77, earnings: 0.8, referrals: 2, status: true },
            { name: "Kishore", email: "kishore@gmail.com", referralId: "C1B2C3D5", wallet: 12, earnings: 0.1, referrals: 0, status: true },
          ]
        }
      };

      this.applyFiltersForAllLevels();

      this.loading = false;
    }, 500);
  }

  // 🔍 Apply search filter
  filterUsers() {
    this.applyFiltersForAllLevels();
  }

  applyFiltersForAllLevels() {
    this.applyFilterForLevel(1, this.data?.genOne?.users || []);
    this.applyFilterForLevel(2, this.data?.genTwo?.users || []);
    this.applyFilterForLevel(3, this.data?.genThree?.users || []);
  }

  applyFilterForLevel(level: number, users: any[]) {
    const q = this.searchQuery[level].toLowerCase();

    this.filtered[level] = users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.referralId.toLowerCase().includes(q)
    );

    this.totalPages[level] = Math.max(1, Math.ceil(this.filtered[level].length / this.pageSize));
    this.currentPage[level] = 1;

    this.updatePage(level);
  }

  updatePage(level: number) {
    const start = (this.currentPage[level] - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginated[level] = this.filtered[level].slice(start, end);
  }

  nextPage() {
    if (this.currentPage[this.activeLevel] < this.totalPages[this.activeLevel]) {
      this.currentPage[this.activeLevel]++;
      this.updatePage(this.activeLevel);
    }
  }

  prevPage() {
    if (this.currentPage[this.activeLevel] > 1) {
      this.currentPage[this.activeLevel]--;
      this.updatePage(this.activeLevel);
    }
  }

  back() {
    this.router.navigate(['/admin/users']);
  }
}