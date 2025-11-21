import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmailModal } from '../email-modal/email-modal';

@Component({
  selector: 'app-user-detail',
  imports: [EmailModal],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail {

  @Output() openAmount = new EventEmitter<any>();

  prefilledWallet: any = null;


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

  openAmountPopup(action: string, walletValue: number) {
    this.openAmount.emit({
      action: action === 'Deposit' ? 'Credit' : 'Debit',  // FIX 1
      row: this.user,
      wallet: walletValue
    });
  }

  onEmailSent(payload: { to: string[]; subject: string; html: string }) {
    // payload contains everything; currently modal already console.logged it.
    // Implement your real send email API here.
    console.log('Parent received send payload', payload);
  }

  onEmailClosed() {
    console.log('Email modal closed');
  }
}