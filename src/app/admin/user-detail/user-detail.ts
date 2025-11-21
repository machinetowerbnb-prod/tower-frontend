import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail {

  @Input() user: any = null;

  @Output() add = new EventEmitter<any>();
  @Output() toggleStatus = new EventEmitter<any>();
  @Output() sendEmail = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  get formattedName() {
    if (!this.user?.name) return "";
    return this.user.name.split(' ').slice(0, 2).join(' ').toUpperCase();
  }

  triggerAdd(action: string) {
    this.add.emit({ action, user: this.user });
  }

  triggerStatusToggle() {
    this.toggleStatus.emit(this.user);
  }

  triggerSendEmail() {
    this.sendEmail.emit(this.user);
  }
}