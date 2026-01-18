import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

import { IndexedDbService } from '../../core/storage/indexed-db.service';
import { NetworkService } from '../../core/network/network.service';

@Component({
  selector: 'app-team',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit {

  userName = '';
  data: any = {};
  levels: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private idb: IndexedDbService,
    private network: NetworkService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) this.fetchTeamData(userId);
    }
  }

  async fetchTeamData(userId: string) {
    this.isLoading = true;
    const cacheKey = `team_${userId}`;

    const payload = {
      screen: 'teams',
      userId
    };

    this.authService.avengers(payload).subscribe({
      next: async (response) => {
        this.isLoading = false;

        // ✅ VALID ONLINE DATA
        if (response?.statusCode === 200 && response?.data) {
          await this.idb.set('cache', cacheKey, response.data);
          this.applyTeamData(response.data);
          return;
        }

        // ⚠️ ONLINE BUT NO DATA → FALLBACK
        const cached = await this.idb.get<any>('cache', cacheKey);
        if (cached) {
          this.applyTeamData(cached);
        } else {
          this.errorMessage = 'No data available';
        }

        this.cdr.detectChanges();
      },

      error: async () => {
        // 🔌 OFFLINE / FAILED
        const cached = await this.idb.get<any>('cache', cacheKey);
        if (cached) {
          this.applyTeamData(cached);
        } else {
          this.errorMessage = 'Offline data not available';
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }



  // 🔁 SAME LOGIC — JUST MOVED TO REUSABLE METHOD
  private applyTeamData(data: any) {

    this.data = {
      totalTeams: data.totalDownlines,
      totalPromationComission: data.totalPromationComission,
      teamRecharge: data.teamRecharge,
      teamWitdrawls: data.teamWitdrawls
    };

    this.userName = data.username;

    const max = Math.max(
      data.genOne?.reffered || 0,
      data.genTwo?.reffered || 0,
      data.genThree?.reffered || 0
    );

    this.levels = [
      {
        id: "First Generation Data",
        title: "First Generation Data",
        value: data.genOne?.valid || 0,
        max: data.genOne?.reffered || 0,
        color: '#ED5F9B',
        progress: data.genOne?.reffered
          ? Math.round(((data.genOne?.valid || 0) / data.genOne.reffered) * 100)
          : 0
      },
      {
        id: 2,
        title: "Second Generation Data",
        value: data.genTwo?.valid || 0,
        max: data.genTwo?.reffered || 0,
        color: '#2CB280',
        progress: data.genTwo?.reffered
          ? Math.round(((data.genTwo?.valid || 0) / data.genTwo.reffered) * 100)
          : 0
      },
      {
        id: 3,
        title: "Third Generation Data",
        value: data.genThree?.valid || 0,
        max: data.genThree?.reffered || 0,
        color: '#2FBDC1',
        progress: data.genThree?.reffered
          ? Math.round(((data.genThree?.valid || 0) / data.genThree.reffered) * 100)
          : 0
      }
    ];

    this.cdr.detectChanges();
  }

  openMembers(level: number) {
    this.router.navigate(['/members'], { queryParams: { level } });
  }
}