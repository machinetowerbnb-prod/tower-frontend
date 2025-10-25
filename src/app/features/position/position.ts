import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-position',
  imports: [CommonModule],
  templateUrl: './position.html',
  styleUrl: './position.scss'
})
export class Position implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  allPositions: any[] = [];
  topThree: any[] = [];
  currentPosition: any;
  arrowDirection: 'up' | 'down' = 'down';
  colorMap: Map<number, string> = new Map();
  showSticky = false;

  ngOnInit() {
    const response = {
      statusCode: 200,
      message: 'success',
      data: {
        currentPosition: { pid: 17, name: 'Manikanta', points: 6000 },
        allPositions: [
          { pid: 1, name: 'Sai', points: 8000 },
          { pid: 2, name: 'Pradeep', points: 7000 },
          { pid: 3, name: 'Karthik', points: 6500 },
          { pid: 4, name: 'Krishna', points: 6400 },
          { pid: 5, name: 'Manoj', points: 6200 },
          { pid: 6, name: 'Kumar', points: 6000 },
          { pid: 7, name: 'Mohan', points: 5900 },
          { pid: 8, name: 'Vishnu', points: 5800 },
          { pid: 9, name: 'Teja', points: 5700 },
          { pid: 10, name: 'Suresh', points: 5600 },
          { pid: 11, name: 'Sunny', points: 5500 },
          { pid: 12, name: 'Anil', points: 5400 },
          { pid: 13, name: 'Kiran', points: 5300 },
          { pid: 14, name: 'Pavan', points: 5200 },
          { pid: 15, name: 'Ravi', points: 5100 },
          { pid: 16, name: 'Deepak', points: 5050 },
          { pid: 17, name: 'Manikanta', points: 6000 },
          { pid: 18, name: 'Vamshi', points: 4900 },
          { pid: 19, name: 'Lokesh', points: 4800 },
          { pid: 20, name: 'Rajesh', points: 4700 },
          { pid: 21, name: 'Rajesh', points: 4700 },
          { pid: 22, name: 'Rajesh', points: 4700 },
          { pid: 23, name: 'Rajesh', points: 4700 },
          { pid: 24, name: 'Rajesh', points: 4700 },
          { pid: 25, name: 'Rajesh', points: 4700 },
          { pid: 26, name: 'Rajesh', points: 4700 },
          { pid: 27, name: 'Rajesh', points: 4700 },
        ],
      },
    };

    // Take all except top 3 for the list
    this.allPositions = response.data.allPositions.slice(3);
    this.currentPosition = response.data.currentPosition;
    this.topThree = response.data.allPositions.slice(0, 3);
  }

    ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Run only in browser environment
      // setTimeout(() => this.scrollToCurrent(), 500);
    }
  }

  scrollToCurrent() {
    if (!isPlatformBrowser(this.platformId)) return; // Prevent SSR errors
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

    // 👇 Show sticky only when actual card is out of view
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
