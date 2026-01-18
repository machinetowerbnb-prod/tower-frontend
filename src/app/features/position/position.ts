import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IndexedDbService } from '../../core/storage/indexed-db.service';

@Component({
  selector: 'app-position',
  imports: [CommonModule],
  templateUrl: './position.html',
  styleUrl: './position.scss'
})
export class Position implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private indexedDbService: IndexedDbService, // ✅ ADD
    private cdr: ChangeDetectorRef
  ) {}

  allPositions: any[] = [];
  topThree: any[] = [];
  currentPosition: any;
  arrowDirection: 'up' | 'down' = 'down';
  colorMap: Map<number, string> = new Map();
  showSticky = false;
  isLoading = true;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getPositions(userId);
      }
    }
  }

  async getPositions(userId: string) {
    const cacheKey = `position_${userId}`;

    const payload = {
      screen: 'position',
      userId: userId,
    };

    this.authService.avengers(payload).subscribe({
      next: async (response) => {
        this.isLoading = false;

        if (response.statusCode === 200 && response.data) {
          // ✅ SAVE TO INDEXED DB
          await this.indexedDbService.set('cache', cacheKey, response.data);

          // ✅ APPLY DATA (existing logic reused)
          this.applyPositionData(response.data);
          return;
        }

        // 🔁 Fallback to cache
        const cached = await this.indexedDbService.get<any>('cache', cacheKey);
        if (cached) {
          this.applyPositionData(cached);
        }
      },
      error: async () => {
        this.isLoading = false;

        // 🔁 OFFLINE FALLBACK
        const cached = await this.indexedDbService.get<any>('cache', cacheKey);
        if (cached) {
          this.applyPositionData(cached);
        }
      }
    });
  }

  // 🔒 EXISTING LOGIC MOVED AS-IS (NO CHANGE)
  private applyPositionData(data: any) {
    const { currentPosition, allPositions } = data;

    if (!currentPosition) {
      console.warn("⚠️ No current position received");
      return;
    }

    this.currentPosition = currentPosition;

    const list = [...allPositions];
    const insertIndex = currentPosition.pid - 1;

    if (insertIndex >= 0 && insertIndex <= list.length) {
      list.splice(insertIndex, 0, currentPosition);
    } else {
      list.push(currentPosition);
    }

    this.topThree = list.slice(0, 3);
    this.allPositions = list.slice(3);

    this.cdr.detectChanges();

    setTimeout(() => {
      this.cdr.detectChanges();
      this.scrollToCurrent();
    }, 300);
  }

  ngAfterViewInit() {
    // no change
  }

  scrollToCurrent() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.currentPosition) return;

    const el = document.getElementById(`rank-${this.currentPosition.pid}`);
    if (!el || !this.scrollContainer) return;

    const container = this.scrollContainer.nativeElement;
    const offset =
      el.getBoundingClientRect().top -
      container.getBoundingClientRect().top -
      container.clientHeight / 2;

    container.scrollTo({ top: offset, behavior: 'smooth' });
  }

  onScroll(event: Event) {
    const container = event.target as HTMLElement;
    const el = document.getElementById(`rank-${this.currentPosition.pid}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const isVisible =
      rect.top >= containerRect.top && rect.bottom <= containerRect.bottom;

    this.showSticky = !isVisible;

    if (rect.bottom < containerRect.top) {
      this.arrowDirection = 'down';
    } else if (rect.top > containerRect.bottom) {
      this.arrowDirection = 'up';
    }
  }

  getInitials(name: string): string {
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? parts[0][0] + parts[1][0]
      : name.slice(0, 2).toUpperCase();
  }

  getRandomColor(pid: number): string {
    if (this.colorMap.has(pid)) return this.colorMap.get(pid)!;
    const colors = ['#E7EDFF', '#DFF8E1', '#FFE6E1', '#FFF7C2', '#E0F0FF'];
    const color = colors[pid % colors.length];
    this.colorMap.set(pid, color);
    return color;
  }
}