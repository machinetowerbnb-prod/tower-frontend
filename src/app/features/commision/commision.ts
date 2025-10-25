import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-commision',
  imports: [CommonModule, RouterModule, TopNav],
  templateUrl: './commision.html',
  styleUrl: './commision.scss'
})
export class Commision {
  commissionDetails:any = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const response = {
      statusCode: 200,
      message: 'success',
      data: {
        commissionDetails: [
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
          {
            email: 'm******ms@gmail.com',
            timestamp: '2025-10-06T07:54:15.149Z',
            commission: 0.3,
          },
        ],
      },
    };

    this.commissionDetails = response.data.commissionDetails;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleString('en-US', options);
  }

  goBack() {
    this.router.navigate(['/team']);
  }
}
