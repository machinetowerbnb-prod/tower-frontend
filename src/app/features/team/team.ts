import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit {
  userName = 'Marcelo';
  data: any = {};
  levels: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    // Simulated API Response
    const response = {
      statusCode: 200,
      message: 'success',
      data: {
        totalTeams: 2345,
        totalPromationComission: 23456.76,
        teamRecharge: 234434.87,
        teamWitdrawls: 23454.43,
        levelOne: 6,
        levelTwo: 13,
        levelThree: 18,
      },
    };

    this.data = response.data;
    const max = 18;

    this.levels = [
      { id: 1, value: this.data.levelOne, max, color: '#ED5F9B', progress: Math.round((this.data.levelOne / max) * 100) },
      { id: 2, value: this.data.levelTwo, max, color: '#2CB280', progress: Math.round((this.data.levelTwo / max) * 100) },
      { id: 3, value: this.data.levelThree, max, color: '#2FBDC1', progress: Math.round((this.data.levelThree / max) * 100) },
    ];
  }

  openMembers(level: number) {
    this.router.navigate(['/members'], { queryParams: { level } });
  }


}
