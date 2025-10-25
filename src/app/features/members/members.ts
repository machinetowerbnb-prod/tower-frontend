import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopNav } from '../top-nav/top-nav';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';

interface Member {
  email: string;
  timestamp: string;
  balance: number;
  inviteCode: string;
}

@Component({
  selector: 'app-members',
  imports: [CommonModule, RouterModule, FormsModule, MatIconModule, TopNav],
  templateUrl: './members.html',
  styleUrl: './members.scss'
})
export class Members implements OnInit {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  searchText = '';

  // constructor(private router: Router, private route: ActivatedRoute) { }

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const level = params['level'];
      console.log('Selected Level:', level);
    });

    const response = {
      statusCode: 200,
      message: 'success',
      data: {
        memberDetails: [
          {
            email: 'manikantasai413.ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            balance: 2086,
            inviteCode: 'ASDFGHJKL',
          },
          {
            email: 'mandy.garis@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            balance: 208,
            inviteCode: 'ZXCVBNMASD',
          },
          {
            email: 'sunder.parka@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            balance: 860,
            inviteCode: 'QWERTYUIO',
          },
          {
            email: 'kurana.sina@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            balance: 2006,
            inviteCode: 'LKJHGFDSA',
          },
        ],
      },
    };

    this.members = response.data.memberDetails;
    this.filteredMembers = [...this.members];
  }

  filterMembers() {
    const text = this.searchText.toLowerCase();
    this.filteredMembers = this.members.filter(
      (m) =>
        m.email.toLowerCase().includes(text) ||
        m.balance.toString().includes(text) ||
        m.inviteCode.toLowerCase().includes(text)
    );
  }

  maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    return (
      user.slice(0, 3) +
      '*'.repeat(Math.max(3, user.length - 3)) +
      '@' +
      domain
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { hour12: false });
    return `${day}-${month}-${year}, ${time}`;
  }

  goBack() {
    this.router.navigate(['/team']);
  }

}
