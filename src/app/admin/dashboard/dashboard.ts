import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  stats: any = {
    totalDeposits: 0,
    totalAmount: 0,
    totalWithdraw: 0,
    totalUsers: 0
  };

  ngOnInit() {
    // Simulate API response — replace this with actual API call
    const response = {
      statusCode: 200,
      message: 'success',
      data: {
        totalDeposits: 44,
        totalAmount: 88267,
        totalWithdraw: 34530,
        totalUsers: 774
      }
    };

    // Assign API data
    this.stats = response.data;
  }
}

