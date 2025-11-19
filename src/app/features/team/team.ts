import { Component, OnInit , ChangeDetectorRef,PLATFORM_ID,Inject} from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit {
  userName = '';
  data: any = {};
  levels: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router, private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    // Simulated API Response
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) this.fetchTeamData(userId);
    }
    // const response = {
    //   statusCode: 200,
    //   message: 'success',
    //   data: {
    //     totalTeams: 2345,
    //     totalPromationComission: 23456.76,
    //     teamRecharge: 234434.87,
    //     teamWitdrawls: 23454.43,
    //     levelOne: 6, //genOne?.valid
    //     levelTwo: 13,//genTwo?.valid
    //     levelThree: 18,//genThree?.valid
    //   },
    // };

    // this.data = response.data;
    // const max = 18; //genOne?.reffered or genTwo?.reffered or genThree?.reffered dynamicly should change based on API data

    // this.levels = [
    //   { id: 1, value: this.data.levelOne, max, color: '#ED5F9B', progress: Math.round((this.data.levelOne / max) * 100) },
    //   { id: 2, value: this.data.levelTwo, max, color: '#2CB280', progress: Math.round((this.data.levelTwo / max) * 100) },
    //   { id: 3, value: this.data.levelThree, max, color: '#2FBDC1', progress: Math.round((this.data.levelThree / max) * 100) },
    // ];
  }
  fetchTeamData(userId:string) {
    this.isLoading = true;
    const payload = {
      screen: 'teams',
      userId: userId
    };

    this.authService.avengers(payload).subscribe({
      next: (response) => {
        console.log('✅ Team API response:', response);
        this.isLoading = false;

        if (response.statusCode === 200 && response.data) {
          const data = response.data;

          this.data = {
            totalTeams: data.totalDownlines,
            totalPromationComission: data.totalPromationComission,
            teamRecharge: data.teamRecharge,
            teamWitdrawls: data.teamWitdrawls
          };
          this.userName = data.username;

          // 🔹 Determine the max from reffered counts (for progress bars)
          const max = Math.max(
            data.genOne?.reffered || 0,
            data.genTwo?.reffered || 0,
            data.genThree?.reffered || 0
          );

          this.levels = [
            {
              id: 1,
              value: data.genOne?.valid || 0,
              max,
              color: '#ED5F9B',
              progress: max ? Math.round(((data.genOne?.valid || 0) / max) * 100) : 0
            },
            {
              id: 2,
              value: data.genTwo?.valid || 0,
              max,
              color: '#2CB280',
              progress: max ? Math.round(((data.genTwo?.valid || 0) / max) * 100) : 0
            },
            {
              id: 3,
              value: data.genThree?.valid || 0,
              max,
              color: '#2FBDC1',
              progress: max ? Math.round(((data.genThree?.valid || 0) / max) * 100) : 0
            }
          ];

          // ✅ Force UI update
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch Team data:', err);
        this.isLoading = false;
        this.errorMessage = 'Failed to load team data.';
        this.cdr.detectChanges();
      }
    });
  }
  openMembers(level: number) {
    console.log('🔹 Navigating to members of level', level);
    this.router.navigate(['/members'], { queryParams: { level } });
  }


}
