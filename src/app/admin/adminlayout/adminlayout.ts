import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  imports: [CommonModule, RouterModule],
  templateUrl: './adminlayout.html',
  styleUrl: './adminlayout.scss'
})
export class Adminlayout {
  isSidebarOpen = true;

  constructor(private router: Router) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

}
